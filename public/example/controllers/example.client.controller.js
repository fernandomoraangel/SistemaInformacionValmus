//Crear función contructor y utilizar inyección de dependencia para el objeto scope
angular.module('example').controller('ExampleController',['$scope', 'Authentication',
function($scope, Authentication){
	$scope.authentication=Authentication;
}
]);
