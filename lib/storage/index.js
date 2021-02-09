'use strict'

const { Storage } = require('@google-cloud/storage')
const fs = require('fs')
const config = require('../../config/config')

var firebase = function () {
    const storageClient = new Storage({
        credentials: config.storage
    })

    return storageClient.bucket(process.env.STORAGE_BUCKET)
}()

/**
 * 
 * @param {file upload request} file 
 * @param {folder in storage firebase} destination // urbanizacion/perfil
 */
function uploadOneFile (file, destination) {
    return new Promise((resolve, reject) => {       
        let dest = file.filename
        if (destination != undefined) {
            dest = `${destination}${file.filename}`
        }

        firebase.upload(file.filename, {
            gzip: true,
            metadata: {
                cacheControl: 'public, max-age=31536000',      
            },
            predefinedAcl: 'publicread',
            destination: dest
        }).then(res => {
            // const response = {
            //     name: file.filename,
            //     bucket: firebase.name,
            //     contentType: file.mimetype,
            //     size: file.size,
            //     url: getURL(file.filename, destination)
            // }
            const response = {
                name: file.filename,
                url: getURL(file.filename, destination)
            }

            fs.unlink(file.filename, function (err) {
                if (err) throw err;
            })

            resolve(response)
        }).catch(err => {
            reject(err)
        })
    })
}

function generateFileName(originalname) {
    originalname = originalname.replace(' ', '_')
    return new Date().getTime() + '-' + originalname
}

function getURL(name, destination) {
    let dest = name
    if (destination != undefined) {
        dest = `${destination}${name}`
    }

    return `https://storage.googleapis.com/${process.env.STORAGE_BUCKET}/${dest}`
}

module.exports = { uploadOneFile, generateFileName }
