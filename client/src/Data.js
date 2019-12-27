import config from './config';

//This class is the connection between the api and the client side. Calling the server with different api methods to the correct routes.

export default class Data {
  api(
    path,
    method = 'GET',
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }
  //COURSES METHODS

  //Get all courses with no authentication process
  async getCourses() {
    const response = await this.api('/api/courses', 'GET', null);
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error();
    }
  }
  //Get single course with no authentication process
  async getSingleCourse(id) {
    const response = await this.api(`/api/courses/${id}`, 'GET', null);
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 404) {
      return null;
    } else {
      console.error(response.status, id);
      throw new Error();
    }
  }
  //Creating a course ensuring a sign in user authentication.
  async createCourse(course, emailAddress, password) {
    const response = await this.api(`/api/courses`, 'POST', course, true, {
      emailAddress,
      password
    });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        console.log(data);
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  //Updating a course with user authentication.
  async updateCourse(id, emailAddress, password, course) {
    const response = await this.api(`/api/courses/${id}`, 'PUT', course, true, {
      emailAddress,
      password
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        console.log(data);
        return data.errors;
      });
    } else if (response.status === 403) {
      return response.json().then(data => {
        console.log(data);
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  //Deleting a course with user authentication.
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(
      `/api/courses/${id}`,
      'DELETE',
      null,
      true,
      { emailAddress, password }
    );
    if (response.status === 204) {
      return [];
    } else if (response.status === 403) {
      return [];
    } else {
      throw new Error();
    }
  }
  //USER'S METHODS

  //Getting a user with user authentication.
  async getUser(emailAddress, password) {
    const response = await this.api(`/api/users`, 'GET', null, true, {
      emailAddress,
      password
    });

    if (response.status === 200) {
      return response.json();
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }
  //Creating a user
  async createUser(user) {
    const response = await this.api('/api/users', 'POST', user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
