import axios from 'axios'

import {API_URL} from '../utils/config'
import logger from '../utils/logger'

const extension = '/api/rooms/'
const baseUrl = API_URL + extension

export default {
    getAll: async () => {
        try {
            logger.info(extension, 'Fetching rooms')

            const res = await axios.get(baseUrl)

            logger.info(extension, 'Rooms fetched', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    create: async (newRoom) => {
        try {
            logger.info(extension, 'Creating room', newRoom)

            const res = await axios.post(baseUrl, newRoom)

            logger.info(extension, 'Room created', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    getById: async (id) => {
        try {
            logger.info(extension, 'Fetching room', id)

            const res = await axios.get(baseUrl + id)

            logger.info(extension, 'Room fetched', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    remove: async (id) => {
        try {
            logger.info(extension, 'Deleting room', id)

            const res = await axios.delete(baseUrl + id)

            logger.info(extension, 'Room deleted', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    update: async (id, newRoom) => {
        try {
            logger.info(extension, 'Updating room', id, newRoom)

            const res = await axios.put(`${baseUrl}${id}`, newRoom)

            logger.info(extension, 'Room updated', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
}