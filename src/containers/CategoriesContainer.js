import React from 'react';
import Category from '../components/Category'

export default class CategoriesContainer extends React.Component {
    render() {
        const {categories} = this.props
        return (
            <div>
                {categories.map(category => <Category key={category.serial} {...category} setQuiz={this.props.setQuiz}/>)}
            </div>
        )
    }
}