!(function() {
  "use strict";
  (window.HumanAPI = function a(b) {
    var c = this;
    "string" == typeof b && (b = { iframeId: b }),
      (b.onReady = function() {
        c._ready = !0;
        for (var a = 0, b = c._readyCallbacks.length; b > a; a++)
          c._readyCallbacks[a](), (c._readyCallbacks.length = 0);
      }),
      (c._rpc = new a.WindowRPCClient(b)),
      (c._ready = !1),
      (c._readyCallbacks = []);
  }),
    (HumanAPI.prototype.send = function(a, b, c) {
      return (
        "function" == typeof b && ((c = b), (b = {})),
        "function" == typeof c && (c = c.bind(this)),
        this._rpc.call(a, b || {}, c),
        this
      );
    }),
    (HumanAPI.prototype.on = function(a, b) {
      return (
        "function" == typeof b && (b = b.bind(this)),
        "human.ready" === a
          ? (this._ready ? b() : this._readyCallbacks.push(b), this)
          : (this._rpc.call("apiEvents.on", a, b, !1), this)
      );
    }),
    (HumanAPI.prototype.once = function(a, b) {
      return (
        "function" == typeof b && (b = b.bind(this)),
        "human.ready" === a
          ? (this._ready ? b() : this._readyCallbacks.push(b), this)
          : (this._rpc.call("apiEvents.once", a, b, !0), this)
      );
    });
})(),
  (function() {
    "use strict";
    HumanAPI.Map = function(a, b) {
      this.items = a || [];
      var c = b || 0,
        d = c + 1;
      (this.addItem = function() {
        var a;
        if (2 === arguments.length) {
          var b = arguments[0];
          if (((a = arguments[1]), this.items[b]))
            throw "ID clash: '" + b + "'";
          return (this.items[b] = a), b;
        }
        for (;;) {
          a = arguments[0];
          var c = d++;
          if (!this.items[c]) return (this.items[c] = a), c;
        }
      }),
        (this.removeItem = function(a) {
          delete this.items[a];
        });
    };
  })(),
  (function() {
    "use strict";
    (HumanAPI.WindowRPCClient = function(a) {
      if (!a.iframeId) throw "config expected: iframeId";
      if (((this._iframe = document.getElementById(a.iframeId)), !this._iframe))
        throw "iframe not found: '" + a.iframeId + "'";
      if (!this._iframe.contentWindow)
        throw "element is not an iframe: '" + a.iframeId + "'";
      (this.destroyed = !1),
        (this._handleMap = new HumanAPI.Map({}, Date.now())),
        (this._subs = {}),
        (this._ready = !1),
        (this._messageBuffer = []),
        (this._messageBufferConnected = []),
        this._connect(a.onUnsupported, a.onConnected, a.onReady);
    }),
      (HumanAPI.WindowRPCClient.prototype._connect = function(a, b, c) {
        var d = null,
          e = this,
          f = 100,
          g = function() {
            h(),
              (d = setInterval(function() {
                return !e.destroyed && e._iframe && e._iframe.contentWindow
                  ? void e._iframe.contentWindow.postMessage(
                      JSON.stringify({ action: "connect" }),
                      "*"
                    )
                  : void h();
              }, f));
          },
          h = function() {
            d && (clearInterval(d), (d = null));
          };
        window.addEventListener(
          "message",
          function(d) {
            var f = d.data;
            switch (f) {
              case "unsupported":
                "function" == typeof a && a(d.data);
                break;
              default:
                var g;
                try {
                  g = JSON.parse(f);
                } catch (i) {
                  return;
                }
                if (g.message) {
                  var j = g.message;
                  switch (j) {
                    case "connected":
                      (e._connected = !0),
                        e._sendQueuedMessages(!0),
                        "function" == typeof b && b();
                      break;
                    case "status":
                      switch (g.status) {
                        case "ready":
                          (e._ready = !0),
                            h(),
                            e._sendQueuedMessages(),
                            "function" == typeof c && c();
                      }
                  }
                }
                if (g.results || g.response) {
                  var k,
                    l = g.results || g.response;
                  for (var m in l)
                    l.hasOwnProperty(m) &&
                      ((k = l[m]), e._subs[m] && e.set(m, k));
                }
                g.error;
            }
          },
          !1
        ),
          e._iframe.addEventListener("load", g),
          e._iframe.addEventListener("unload", h),
          g();
      }),
      (HumanAPI.WindowRPCClient.prototype._sendQueuedMessages = function(a) {
        for (
          var b = a ? this._messageBufferConnected : this._messageBuffer;
          b.length > 0;

        ) {
          var c = b.pop();
          this._send(c, c.ok, c.once);
        }
      }),
      (HumanAPI.WindowRPCClient.prototype.call = function(a, b, c, d) {
        var e = { call: a, params: b, ok: c, once: d },
          f = b.connected ? this._messageBufferConnected : this._messageBuffer;
        this._ready || (this._connected && b.connected)
          ? this._send(e, c, d)
          : f.unshift(e);
      }),
      (HumanAPI.WindowRPCClient.prototype._send = function(a, b, c) {
        if (b) {
          var d = this,
            e = this._on(function(a) {
              (void 0 === c || c === !0) && d._off(e), b.call(d, a);
            });
          (a.id = e), this._sendMessage(a);
        } else this._sendMessage(a);
      }),
      (HumanAPI.WindowRPCClient.prototype._sendMessage = function(a) {
        this._onSend && this._onSend(a),
          this.destroyed ||
            this._iframe.contentWindow.postMessage(JSON.stringify(a), "*");
      }),
      (HumanAPI.WindowRPCClient.prototype.set = function(a, b) {
        var c = this._subs[a];
        c && c.call(this, b);
      }),
      (HumanAPI.WindowRPCClient.prototype._on = function(a) {
        var b = this._handleMap.addItem();
        return (this._subs[b] = a), b;
      }),
      (HumanAPI.WindowRPCClient.prototype._off = function(a) {
        delete this._subs[a], this._handleMap.removeItem(a);
      }),
      (HumanAPI.WindowRPCClient.prototype.destroy = function() {
        this.destroyed = !0;
      });
  })();


  