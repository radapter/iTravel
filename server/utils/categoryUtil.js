'use strict';

(function(window){

  /**
   * Category Utilities
   * @constructor
   * @param  {Object} data category JSON data of Foursquare
   * @return {Object}      an instance of CategoryUtil Object
   */
  var CategoryUtil = function(data){
    this.data = data;
    this.data.id="root";

    /**
     * helper, find a clean category object, and return the path bottom up.
     * @private
     * @param {Object:Category} obj      Category Node
     * @param {String} id                Foursquare Category UUID
     * @param {Category[] | null} result Temp storage to handle data
     */
    var hierarchyHelper = function(obj, id, result){
      if(obj.id==id)
        return result;
      if(!obj.categories)
        return null;

      for(var i = 0; i< obj.categories.length; i++){
        var subResult = hierarchyHelper(obj.categories[i], id, result);
        if(subResult != null){
          result = subResult;
          var cur = obj.categories[i];
          result.push({"id": cur.id, "name": cur.name, "icon": cur.icon});
          return result;
        }
      }
      return null;
    };

    /**
     * Get a array to describe the category hierarchy, [root, child, grandchild ...]
     * @param {String} id   Category ID
     * @return {Category[]} array of category object
     * category object like this:
     * {
         "id": "4d4b7104d754a06370d81259",
         "name": "Arts & Entertainment",
         "icon": {
             "prefix": "https://ss3.4sqi.net/img/categories_v2/arts_entertainment/default_",
             "suffix": ".png"
         }
       }
     */
    this.getCategoryHierarchy = function(id){
      var result = [];
      result = hierarchyHelper(this.data, id, result);
      if(result == null)
        return null;
      return result.reverse();
    };

    /**
     * Get the root category of an existing category
     * @param {String} id          Foursquare UUID of category
     * @return {Object:Category}   root category object
     */
    this.getRootCategory = function(id){
      return this.getCategoryHierarchy(id)[0];
    };

    return this;
  };

  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    // Node.js export
    module.exports = CategoryUtil;
  } else {
    // Browser export
    window.iTravel.CategoryUtil = CategoryUtil;
  }
})(this);
