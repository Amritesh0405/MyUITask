ehubApp.controller('entityVisualiserController', ['$scope', '$http',  'DATA_API', 'getUrl', 'getTitle', '$uibModalInstance', function($scope, $http, DATA_API, getUrl, getTitle, $uibModalInstance){
	
 	/*
 	*@purpose: load entity visualiser by using displacy
 	*@created: 01 aug 2017
 	*@params: text(string)
 	*@returns: none
 	*@author: swathi
 	*/
 	function loadEntity(){
		// Your API
            const api = 'https://api.explosion.ai/displacy/ent/';

            // Init displaCY ENT
            const displacy = new displaCyENT(api, {
                container: '#displacy'
            });

            const text = 'When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him seriously.';
            const model = 'en';

            // Entities to visualise
            const ents = ['person', 'org', 'date'];

            // Parse text
            displacy.parse(text, model, ents).onSuccess(function(response){
                console.log("response", response);
            });
 	};
        loadEntity();
 	
}]);