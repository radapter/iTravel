'use strict';

(function(window){

  var CategoryUtil = function(data){
    this.data = data;
    this.data.id="root";

    /**
     * Private helper, use for category Hierarchy
     * @param {Object:Category} obj    Category Node
     * @param {String} id     Foursquare Category UUID
     * @param {Array} result Temp storage to handle data
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
     * @param {String} id Category ID
     * @return {Array} array of category object
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
      return result.reverse();
    };

    /**
     * Get the root category of an existing category
     * @param {String} id Foursquare UUID of category
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
