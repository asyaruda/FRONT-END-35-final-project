import { delay } from '../utils';

export class Api {
  delay = 1000;

  constructor (url) {
    this.url = url
  }

  async request(url = '', method = 'GET', body) {
    await delay(this.delay);

    const response = await fetch(`${this.url}${url}`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-type': 'application/json',
      }
    });

    if (response.ok) {
      return response.json()
    }

    throw new Error(`${response.status} ${response.statusText}`);
  }

  async getList () {
    try {
      return await this.request()
    } catch (error) {
      throw new Error(`Can not fitch list: ${error.message}`);
    }
  }

  async getOne (id) {
    try {
      return await this.request(id)
    } catch (error) {
      throw new Error(`Can not fitch one item: ${error.message}`);
    }
  }

  async create (data) {
    try {
      return await this.request('', 'POST', data)
    } catch (error) {
      throw new Error(`Can not create: ${error.message}`);
    }
  }

  async update (id, data) {
    try {
      return await this.request(id, 'PUT', data)
    } catch (error) {
      throw new Error(`Can not update: ${error.message}`);
    }
  }

  async delete (id) {
    try {
      return await this.request(id, 'DELETE')
    } catch (error) {
      throw new Error(`Can not delete: ${error.message}`);
    }
  }
}
