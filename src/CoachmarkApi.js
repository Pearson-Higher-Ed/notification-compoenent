module.exports = function() {
	this.getCoachmark = function(coachmarkId) {
		let async = new Promise(function(resolve, reject) {
			setTimeout(function() {
				let dataset = [{
          element: 'foo1',
          //callback:'function (id) { console.log("Callback executed on exit " + id);};',
          options: {
            id: 10,
            like: false,
            placement: 'bottom',
            title: 'Coachmark #1.1',
            text: 'Some text for the first coachmark',
            hasBack: false,
            hasNext: true,
            currentCM: 1,
            totalCM: 3
          }
				},
				{
					element: 'foo2',
					//callback:'function (id) { console.log("Callback executed on exit " + id);};',
					options: {
						id: 11,
						like: false,
						placement: 'bottom',
						title: 'Coachmark #1.2',
						text: 'Some text for the next coachmark',
						hasBack: true,
						hasNext: true,
						currentCM: 2,
						totalCM: 3
					}
				},
				{
					element: 'foo3',
					//callback:'function (id) { console.log("Callback executed on exit " + id);};',
					options: {
						id: 12,
						like: false,
						placement: 'bottom',
						title: 'Coachmark #1.3',
						text: 'Some text for the last coachmark',
						hasBack: true,
						hasNext: true,
						currentCM: 3,
						totalCM: 3
					}
				},
				{
					element: 'foo4',
					//callback:'function (id) { console.log("Callback executed on exit " + id);};',
					options: {
						id: 13,
						like: true,
						placement: 'bottom',
						title: 'Coachmark #1.4',
						text: 'Some text for the last coachmark',
						hasBack: true,
						hasNext: false,
						currentCM: 3,
						totalCM: 3
					}
				},
				// 2nd notification
				{
          element: 'foo1',
          callback:'function (id) { console.log("Callback executed on exit #2 " + id);};',
          options: {
            id: 20,
            like: true,
            placement: 'bottom',
            title: 'Coachmark #2',
            text: 'Some text for the second coachmark',
            hasBack: false,
            hasNext: false,
            currentCM: 1,
            totalCM: 1
          }
				}];

				var result;
				for (var i = 0; i < dataset.length; i++) {
					if (dataset[i].options.id === coachmarkId) {
						result = dataset[i];
						break
					}
				}
				resolve(result);
			}, 2000);
		});

		return async;
	};
};
