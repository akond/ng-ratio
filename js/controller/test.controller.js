angular.module('trips').controller('TestCtrl', TestController);

TestController.$inject = ['$scope', 'storage', 'tripRepository', 'rationRepository'];

function TestController ($scope, storage, tripRepository, rationRepository) {
    $scope.reset = function () {
        storage.reset();
    };

    $scope.saveRation = function () {
        var trip = tripRepository.find ('ef0cc104-e967-404c-9901-147c71c929e7');
        console.log (trip)
        console.log (rationRepository.findAll (trip.id));

        return ;
        var ration = new Ration();
        ration.product = 'a2b77d91-7fc8-432e-a953-a008e27e2b84';
        ration.amount = 100;
        rationRepository.save (ration, trip.id, 0, 0)


        ration = new Ration();
        ration.product = 'a2b77d91-7fc8-432e-a953-a008e27e2b84';
        ration.amount = 200;
        rationRepository.save (ration, trip.id, 0, 2)

        return;
        console.log (rationRepository.save (new Ration(), trip.id, 0, 1));
        console.log (rationRepository.save (new Ration(), trip.id, 0, 2));
        console.log (rationRepository.save (new Ration(), trip.id, 1, 0));

    };
}
