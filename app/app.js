app = angular.module('calendarDemoApp', ['angular-momentjs']);

// your controller and directive code go here

app.controller('calendarCtrl', function($scope, $moment){



	// 20 YEARS AHEAD, 20 YEARS PAST (FOR DROPDOWNS)
	var selectableYears = 20;

	// MONTHS THAT ARE SELECTABLE ON DROPDOWN
	$scope.selectableMonths = [
		{
			realnumber : 1,
			number: 0,
			name: $moment().month(0).format('MMMM')
		},
		{
			realnumber : 2,
			number: 1,
			name: $moment().month(1).format('MMMM')
		},
		{
			realnumber : 3,
			number: 2,
			name: $moment().month(2).format('MMMM')
		},
		{
			realnumber : 4,
			number: 3,
			name: $moment().month(3).format('MMMM')
		},
		{
			realnumber : 5,
			number: 4,
			name: $moment().month(4).format('MMMM')
		},
		{
			realnumber : 6,
			number: 5,
			name: $moment().month(5).format('MMMM')
		},
		{
			realnumber : 7,
			number: 6,
			name: $moment().month(6).format('MMMM')
		},
		{
			realnumber : 8,
			number: 7,
			name: $moment().month(7).format('MMMM')
		},
		{
			realnumber : 9,
			number: 8,
			name: $moment().month(8).format('MMMM')
		},
		{
			realnumber : 10,
			number: 9,
			name: $moment().month(9).format('MMMM')
		},
		{
			realnumber : 11,
			number: 10,
			name: $moment().month(10).format('MMMM')
		},
		{
			realnumber : 12,
			number: 11,
			name: $moment().month(11).format('MMMM')
		}
	]

	

	$scope.currentMonth = $moment().month();
	$scope.currentYear = $moment().year();

	$scope.pickMonth = $scope.selectableMonths[$scope.currentMonth];
	
	// CHECK MONTH
	$scope.isCurrentMonth = function(m){
		return $moment().month(m).format('MMMM');
	}

	// CHECK IF ITERATED DATE IS CURRENT DATE (FOR NGCLASS)
	$scope.isToday = function(checkDate){
		return ($moment(checkDate).date() == $moment().date() && $moment(checkDate).month() == $moment().month() && $moment(checkDate).year() == $moment().year()) ? true:false;
	}

	// INITIALIZE CURRENT MONTH & YEAR.
	$scope.pickedDate = CalendarRange.prepareDate($moment());


	// FUNCTION FOR CHANGING MONTH & YEAR USING DROPDOWNS.
	$scope.changeDate = function(month, year){
		if(month && year){
			$scope.pickedDate = CalendarRange.prepareDate($moment(year + '-' + month.realnumber + '-' + 1));
			$scope.currentMonthYear = $moment($scope.pickedDate).format('MMMM') + ', ' + $moment($scope.pickedDate).year();
		}
	}

	// CURRENT DATE AS JS DATE OBJECT.
	$scope.defaultDate = new Date();

	// USED FOR DISPLAYING MONTH AND YEAR AT TOP OF PAGE.
	$scope.currentMonthYear = $moment().month($scope.currentMonth).format('MMMM') + ', ' + $scope.currentYear;

	// DROPDOWN MENUS
	$scope.selectYears = [];

	// PUSH PREVIOUS 20 YEARS TO SELECTABLE YEARS
	for(var y = selectableYears; y >= 1; y--){
		$scope.selectYears.push($moment().subtract(y, 'years').year());		
	}

	// PUSH CURRENT YEAR TO SELECTABLE YEARS AND SET TO DEFAULT
	$scope.selectYears.push($moment().year());
	$scope.pickYear = $scope.selectYears[$scope.selectYears.indexOf($moment().year())];

	// PUSH NEXT 20 YEARS TO SELECTABLE YEARS
	for(var u = 1; u <= selectableYears; u++){
		$scope.selectYears.push($moment().add(u, 'years').year());		
	}
});

app.directive('calendar', function(){
	return {
		restrict: 'E',
		scope: true,
		link: function(scope, element, attrs){			

		},
		controller: function($scope, $element, $attrs){
			$scope.datePrepped = CalendarRange.prepareDate(new Date());
			$scope.dateMonthlyRange = CalendarRange.getMonthlyRange(new Date());
			$scope.theDate = CalendarRange.getMonthlyRange(new Date($attrs.difdate));

			// WATCH FOR CHANGES ON DIFDATE ATTRIBUTE
			$scope.$watch($attrs.difdate, function(val){
				$scope.dateMonthlyRange = CalendarRange.getMonthlyRange(val.date);
			});

			var days = $scope.dateMonthlyRange.days;
		},
		templateUrl: 'templates/calendar.html'
	};
});