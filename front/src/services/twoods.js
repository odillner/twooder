import axios from 'axios'

import {API_URL} from '../utils/config'
import logger from '../utils/logger'

const extension = 'api/twoods/'
const baseUrl = API_URL + extension

export default {
    getAll: async () => {
        try {
            logger.info(extension, 'Fetching twoods')

            const res = await axios.get(baseUrl)

            logger.info(extension, 'Twoods fetched', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    create: async (newTwood, token) => {
        try {
            logger.info(extension, 'Creating twood', newTwood)

            const res = await axios.post(baseUrl, newTwood, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            logger.info(extension, 'Twood created', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    getById: async (id) => {
        try {
            logger.info(extension, 'Fetching twood', id)

            const res = await axios.get(baseUrl + id)

            logger.info(extension, 'Twood fetched', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    getByUser: async (id) => {
        try {
            logger.info(extension, 'Fetching twoods', id)

            const res = await axios.get(baseUrl + 'user/' + id)

            logger.info(extension, 'Twoods fetched', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    remove: async (id, token) => {
        try {
            logger.info(extension, 'Deleting twood', id)

            const res = await axios.delete(baseUrl + id, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            logger.info(extension, 'Twood deleted', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    update: async (id, newTwood, token) => {
        try {
            logger.info(extension, 'Updating twood', id, newTwood)

            const res = await axios.put(`${baseUrl}${id}`, newTwood, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            logger.info(extension, 'Twood updated', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    }
}