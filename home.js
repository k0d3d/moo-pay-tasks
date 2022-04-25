const deepClone = require("lodash.clonedeep");
const { getDistance } = require('geolib');


const londonCityLatLng = {
  latitude: 51.515419, 
  longitude: -0.141099
}



/**
 * Deep clone the supplied object
 * @param {*} objectToClone the object to be deep cloned
 * @returns
 */
module.exports.clone = (objectToClone) => {
  return deepClone(objectToClone);
};

/**
 * Find only partner offices within the supplied maxDistance. Sort the result by company name
 * @param {{
 *   "id": string,
 *   "urlName": string,
 *   "organization": string,
 *   "customerLocations": string,
 *   "willWorkRemotely": boolean,
 *   "website": string,
 *   "services": string,
 *   "offices": [
 *    {
 *      "location": string,
 *      "address": string,
 *      "coordinates": string
 *    }
 *   ]  
 *  }[]} listOfPartners a list of partners with office locations in London
 * @param {Number} maxDistance the max amount distance to find partner offices.
 */
module.exports.findOfficesInRange = (listOfPartners, maxDistance = 100) => {

  return listOfPartners.filter(partner => {

    const offices = partner.offices.filter(office => {

      const partnerOfficeLatLng = {
        latitude: parseFloat( office.coordinates.split(",")[0] ), 
        longitude: parseFloat( office.coordinates.split(",")[1] )
      }


      const distance = getDistance(
        londonCityLatLng,
        partnerOfficeLatLng
      )
        
      // results are in meters, so 100km == 1000 * 100
      return distance <= 1000 * 100

    })
    
    // results are in meters, so 100km == 1000 * 100
    return offices.length > 0
  }).sort((a, b) => {
    const nameA = a.organization.toLowerCase(); // ignore upper and lowercase
    const nameB = b.organization.toLowerCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });
};
