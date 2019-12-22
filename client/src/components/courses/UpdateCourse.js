import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UpdateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: null,
    errors: []
  };
  componentDidMount() {
    const { context, courseId } = this.props;
    context.data.getSingleCourse(courseId).then(singleCourse => {
      this.setState({
        id: courseId,
        title: singleCourse.course.title,
        description: singleCourse.course.description,
        estimatedTime: singleCourse.course.estimatedTime,
        materialsNeeded: singleCourse.course.materialsNeeded,
        userId: singleCourse.course.userId,
        firstName: singleCourse.course.User.firstName,
        lastName: singleCourse.course.User.lastName
      });
    });
  }

  render() {
    if (this.state) {
        const {id, title, description, estimatedTime, materialsNeeded, userId, firstName, lastName} = this.state;
      
      return <div>Update course</div>;
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default UpdateCourse;
