module.exports = function() {
	this.getCoachmark = function(coachmarkId) {
		let async = new Promise(function(resolve, reject) {
			setTimeout(function() {
				let dataset = [{
          element: 'foo1',
					uri: 'index.html',
          options: {
            id: 10,
            like: false,
            placement: 'bottom',
            title: 'Coachmark #1.1',
            text: 'Some text for the first coachmark',
            hasBack: false,
            hasNext: true,
            currentCM: 1,
            totalCM: 6
          }
				},
				{
					element: 'foo2',
					options: {
						id: 11,
						like: false,
						placement: 'bottom',
						title: 'Coachmark #1.2',
						text: 'Some text for the next coachmark',
						hasBack: true,
						hasNext: true,
						currentCM: 2,
						totalCM: 6
					}
				},
				{
					element: 'foo3',
					uri: 'index.html',
					options: {
						id: 12,
						like: false,
						placement: 'bottom',
						title: 'Coachmark #1.3',
						text: 'Moar..',
						hasBack: true,
						hasNext: true,
						currentCM: 3,
						totalCM: 6
					}
				},
				{
					element: 'foo4',
					uri: 'index2.html',
					options: {
						id: 13,
						like: false,
						placement: 'bottom',
						title: 'Coachmark #1.4',
						text: 'Last one before the redirect to the new page...',
						hasBack: true,
						hasNext: true,
						currentCM: 4,
						totalCM: 6
					}
				},
				{
					element: 'foo5',
					uri: 'index2.html',
					options: {
						id: 14,
						like: false,
						placement: 'bottom',
						title: 'Coachmark #1.5',
						text: 'New page!',
						hasBack: true,
						hasNext: true,
						currentCM: 5,
						totalCM: 6
					}
				},
				{
					element: 'foo6',
					uri: 'index2.html',
					options: {
						id: 15,
						like: true,
						placement: 'bottom',
						title: 'Coachmark #1.6',
						text: 'New page2!',
						hasBack: true,
						hasNext: false,
						currentCM: 6,
						totalCM: 6
					}
				},
				// 2nd notification
				{
          element: 'bar1',
          callback:'function (id) { console.log("Callback executed on exit:  " + id);};',
					uri: 'index.html',
          options: {
            id: 20,
            like: true,
            placement: 'bottom',
            title: 'Coachmark #2',
            text: 'Some text for the second coachmark',
            hasBack: false,
            hasNext: false,
            currentCM: 1,
            totalCM: 1,
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
			}, 200);
		});

		return async;
	};
};
