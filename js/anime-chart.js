
/****************************************************
* ---------------									*
* | Anime Chart |									*
* ---------------									*
* v 1.00, written on:	14th January 2013			*
* Script written by:	Fahd						*
*													*
* ================================================= *
*													*
*	Legal-speak:									*
*	""""""""""""									*
* To the extent possible under law, the author(s)	*
* have dedicated all copyright and related and		*
* neighboring rights to this software to the public *
* domain worldwide. This software is distributed    *
* without any warranty.                             *
*													*
* You should have received a copy of the CC0		*
* Public Domain Dedication along with this			*
* software. If not, see:							*
*													*
* http://creativecommons.org/publicdomain/zero/1.0	*
*													*
* ------------------------------------------------- *
*													*
*	Plain language:									*
*	"""""""""""""""									*
* I, the author, release this script into the		* 
* public domain. You're free to do with it what		*
* you will, but please don't state that your use of	*
* this script implies that I endorse your work.		*
* Furthermore, I make no guarantee of support with	*
* your use of this script. I might choose to help	*
* (as my free time permits), but I'm not under any	*
* obligation to do so.								*
*													*
* This is obviously NOT a requirement of use, but	*
* if you know someone else who would benefit from	*
* this script then please pass on the word. A link	*
* or blog/forum post would be appreciated. The		*
* reason I released this into the public domain	was *
* so that it could be of use to as many	people as	*
* possible. Once again, this is NOT a requirement   *
* of use, so only pass on the word if you wish to	*
* do so.											*
*													*
* The concept of public domain does not exist in	*
* some countries. If that's the case in your		*
* country then you are granted the right to use		*
* this script under the terms of the Creative		* 
* Commons Zero (CC0) 1.0 Universal license.	This	*
* essentially gives you the same rights as to use	*
* this script as if it were released under public	*
* domain.											*
*													*
*													*
* Full details of the CC0 1.0 Universal	license		*
* can be found on the Creative Commons wiki page:	*
*													*
* http://wiki.creativecommons.org/CC0_FAQ			*
*													*
****************************************************/


$(document).ready(function() {

	// ====================================================================
	// Language strings, Colour settings, & Font settings.


	// Edit/Translate these strings as necessary.
	function languageStrings() {

		var languageVariables = {
			chartTitleText:				'Anime show ratings by year.',				// Char title.
			culmativeAvgSeriesTitle:	'Culmative avg. rating',					// Culmative average series line  title.
			weightCulmAvgSeriesTitle:	'Weighted culmative avg. rating',			// Weighted Culmative average series line title.
			yearAxisTitle:				'Year',										// Year axis title (on the bottom horizontal axis).
			numShowsAxisLabel:			'Number of shows - Bars',					// Number of shows axis label (on the left vertical axis).
			ratingAxisLabel:			'Rating (out of 10) - Lines',				// Rating axis label (on the right vertical axis).
			noDataSeriesLabel:			' (no data)',								// Display (no data) after the series label if there is no data points for it.
			showsHoverLabel:			'Shows:',									// Show title label when hovering over a data bar.
			otherStatsHoverLabel:		'Other statistics:',						// Other statistics title label when hovering over a data point.
			weightAvgShowsHoverLabel:	'No. of weight-averaged, %s shows',			// Total number of shows started/finished (%s) that were weight-averaged. Used on the data point hover label.
			totalNumShowsHoverLabel:	'Total no. of shows %s',					// Total number of shows started/finished (%s) so far. Used on the data point hover label.
			numRecentShowsHoverLabel:	'No. of recently %s shows',					// Number of recently started/finished (%s) shows. Used on the data point hover label.
			recentShowAvgHoverLabel:	'Recently %s show average',					// Average rating for recently started/finished (%s) shows. Used on the data point hover label. 
			recentShowRatingHoverLabel:	'Recently %s shows - rating:',				// Title for recently started/finished (%s) shows. Used on the data point hover label. 
			noShowsHoverLabel:			'None',										// Text shown if no shows were watched in a particular season. Used on the data point hover label.
			startedHoeverLabel:			'started',									// Text shown on a hover label if the data points refers to shows that have just started.
			finishedHoeverLabel:		'finished',									// Text shown on a hover label if the data points refers to shows that have just finished.
			divByTen:					'/10',										// Divide by ten string for the rating series labels.
			emptyString:				'...',										// Shown when no value is present (e.g. the average rating for a season when no series was watched).
			spacingString:				'.'											// A character used to space other strings out. It will be assigned a white/transparent colour so as not to show.
		}

		return languageVariables;
	}

	// Colour Variables
	function colourStrings() {

		var colourVariables = {
			barColours:					['#fb9292', '#bc01b0', '#0896d8', '#cb6d21', '#609725', '#cfb820', '#aa4643', '#2d5fa1', '#2a8e69', '#8047a9'],	// Colours for each of the rating bars
			yearColourBackground:		['#fffbe0', '#ffebeb', '#ebf3ff', '#ebfff8', '#f8edff'],						// The background colours in the chart area - one colour per year area.

			yearAxisTitleColour:		'#000000',						// The text colour for the year axis title.
			numShowsAxisTitleColour:	'#000000',						// The text colour for the number of shows axis title.
			ratingAxisTitleColour:		'#000000',						// The text colour for the average rating axis title.
			chartBackgroundColour:		'#ffffff',						// Background colour for the chart.
			tooltipSpacingColour:		'#ffffff',						// Tooltip colour used for spacing characters. The colour is set to white so the spacing characters appear transparent.
			culmativeAvgGraphColour:	'#0fade1',						// Graph line & point colour for the culmative average series.
			weightedCAvgGraphColour:	'#e1bc0f'						// Graph line & point colour for the weighted culmative average series.
		}

		return colourVariables;
	}

	// Font size variables.
	function fontSettings() {

		var fontSizeVariables = {
			generalFontSize:			10,		// General string font size.
			tooltipTitleFontSize:		11,		// Tooltip title font size.
			spacingStringMediumSize:	5,		// Invsible vertical spacing string medium font size.
			spacingStringSmallSize:		2		// Invsible vertical spacing string small font size.
		}

		return fontSizeVariables;
	}

	// A couple of settings for the plot (e.g. animated graphs, marker types, etc).
	function plotSettings() {

		var plotDisplayVariables = {
			animatedDrawOut:			false,	// Controls the animated drawing of the graph when first loaded.
			culmativeAvgGraphSymbol:	'circle',
			weightedCAvgGraphSymbol:	'square',
			culmativeAvgGraphSymSize:	4,
			weightedCAvgGraphSymSize:	5
		}

		return plotDisplayVariables;
	}

	// ====================================================================
	// Script starts here...


	// Create a range of (inclusive) values
	function createValueRange(lowValue, highValue) {
		var rangeListIndex = 0;
		var rangeListArray = [];
		rangeListArray[rangeListIndex] = lowValue;

		// Insert elements into the array
		while (rangeListArray[rangeListArray.length - 1] < highValue) {
			rangeListIndex = rangeListArray.length;
			rangeListArray[rangeListIndex] = rangeListArray[rangeListIndex - 1] + 1;
		}

		return rangeListArray;
	}

	// Create an array with a series of initalized zeroed values
	function createEmptyArray(emptyArrayRange, emptyArrayValue) {
		var emptyArray = [];
		var emptyIndex = 0;

		// Create the empty array.
		while (emptyArray.length < emptyArrayRange) {
			emptyArray[emptyIndex] = emptyArrayValue;
			emptyIndex++;
		}

		return emptyArray;
	}

	// Sort a series of array elements by their show title,
	// (in ascending order).
	function showTitleSort(u, v) {
		var x = u['showTitle'].toLowerCase();
		var y = v['showTitle'].toLowerCase();
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	}

	// Sort a series of array elements alphabetically.
	function simpleShowTitleSort(u, v) {
		var x = u.toLowerCase();
		var y = v.toLowerCase();
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	}

	// Determine if a number is (inclusively) within a specified range.
	function isWithinRange(testNumber, lowRange, highRange) {
		var testResult;

		if ((testNumber >= lowRange) && (testNumber <= highRange)) {
			testResult = true;
		} else {
			testResult = false;
		}

		return testResult;
	}


	// Create a list of UTC timestamps for a given year range, including a number of points before
	// and after this range.
	function timestampDataPoints(yearList, monthList, numPastDataPoints, numFutureDataPoints) {

		// Setup some variables, including for the reverse loop (for the past data points).
		var i, j, outLeftBoundaryPoint, outRightBoundaryPoint, inRightBoundaryPoint;
		var timestampList = [];
		var reverseTimestampList = [];
		var reverseYearVal = yearList[0] - 1;
		var futureYearVal = yearList[yearList.length - 1] + 1;
		var monthListLength = monthList.length;
		var yearListLength = yearList.length;

		// Create a timestamp one point before the list of timestamps. This is so we know which shows fall
		// into (i.e. start/finish in) that period. This will be used for the data point tooltips.
		outLeftBoundaryPoint = Date.UTC(reverseYearVal, monthList[monthListLength - 1], 1);
		
		// Copy the timestamp of the very first point shown in the graph area so that we can use it later
		// for the graph line extending over the left edge of the graph area.
		inLeftBoundaryPoint = Date.UTC(yearList[0], monthList[0], 1);

		// Create a timestamp one point after the list of timestamps. This is so (like above) we can later 
		// on determine which shows start/finish between the last point and a point just past the right
		// edge of the graph. That way we can have the graph line extend to the right boundary.
		outRightBoundaryPoint = Date.UTC(futureYearVal, monthList[1], 1);

		// Copy the timestamp of the very last point shown in the graph area so that we can use it later
		// for the graph line extending over the right edge of the graph area.
		inRightBoundaryPoint = Date.UTC(futureYearVal, monthList[0], 1);


		// Loop backwards from before the first year & month in yearList & monthList.
		while (numPastDataPoints > 0) {

			// Loop backwards over the month values & insert the timestamps. Subtract
			// a past data point from the counter for each data point inserted. The
			// loop will be broken once the number of past data points = 0.
			for (i = monthListLength; i > 0; i--) {
				reverseTimestampList.push(Date.UTC(reverseYearVal, monthList[i - 1], 1));
				numPastDataPoints--;
				
				/*if (numPastDataPoints == 0) {
					outLeftBoundaryPoint = (i == 1) ? Date.UTC(reverseYearVal - 1, monthList[monthListLength - 1], 1) : Date.UTC(reverseYearVal, monthList[i - 2], 1);
					break;
				}*/
			}

			// Subtract a year from reverseYearVal:
			reverseYearVal--;
		}

		// Reverse the order of the past data points so they progress from past --> present.
		timestampList = reverseTimestampList.reverse();

		// Now we insert data points using the yearList array.
		for (i = 0; i < yearListLength; i++) {
			for (j = 0; j < monthListLength; j++) {
				timestampList.push(Date.UTC(yearList[i], monthList[j], 1));
			}
		}


		// Finally the future data points.
		while (numFutureDataPoints > 0) {

			// Loop backwards over the month values & insert the timestamps. Subtract
			// a past data point from the counter for each data point inserted. The
			// loop will be broken once the number of past data points = 0.
			for (i = 0; i < monthListLength; i++) {
				timestampList.push(Date.UTC(futureYearVal, monthList[i], 1));
				numFutureDataPoints--;
				
				if (numFutureDataPoints == 0) {
					break;
				}
			}

			// Subtract a year from reverseYearVal:
			futureYearVal++;
		}

		// Return array.
		var timestampVars = {
			outsideLeftBoundary:	outLeftBoundaryPoint,
			outsideRightBoundary:	outRightBoundaryPoint,
			insideLeftBoundary:		inLeftBoundaryPoint,
			insideRightBoundary:	inRightBoundaryPoint,
			points:					timestampList
		};

		return timestampVars;
	}

	// Returns the midpoint between two timestamps.
	function midpointCalc(prevPoint, nextPoint, midpointDecimal) {
		var midpointVal = prevPoint + Math.round( midpointDecimal * (nextPoint - prevPoint) );
		return midpointVal;
	}

	// Geometric weighting formula. Takes a series of formula parameters, the data point number,
	// the sum of show ratings for that data point, and the number of shows that season. Using
	// these it returns a weighted average for the data point given. Note that nMaxPar is the
	// maximum nth value.
	function geometricWeight(aPar, nPar, nMaxPar, sumShowRating, numShows) {
		var forumlaPartOne, forumlaPartTwo, forumlaPartThree, weight, weightedSeasonAverage;

		// Set aPar to a suitable value if less than or equal to 2.
		aPar = (aPar <= 2) ? 2.001 : aPar;

		// Determine the three parts of the formula which give the weight, using
		// the input parameters. The weighting formula is as follows:
		//	weight = ( 1 / [aPar ^ nPar] ) + 
		//			   1 / ( nMaxPar * [ {aPar - 1} / {aPar - 2} ] ) + 
		//			 ( 1 / aPar ) * ( 1 / [ {aPar - 1} * aPar ] ) * ( 1 / [ aPar ^ {nMaxPar - 1} ] )
		forumlaPartOne		= 1 / Math.pow(aPar, nPar);
		forumlaPartTwo		= 1 / ( nMaxPar * ( (aPar - 1) / (aPar - 2) ) );
		forumlaPartThree	= ( 1 / aPar ) * ( 1 / ( ( aPar - 1 ) * aPar ) ) * ( 1 / Math.pow(aPar, nMaxPar - 1) );
		weight				= forumlaPartOne + forumlaPartTwo + forumlaPartThree;

		weightedSeasonAverage = weight * (sumShowRating / numShows);
		return weightedSeasonAverage;
	}

	// This function takes a season data point, then loops over previous seasons whilst calling the geometricWeight
	// function. The number of shows and sum of show scores are passed to the geometricWeight function so that the
	// calculated weight can be multiplied by season average. During the loop all these [weight * average] values
	// are added togeather to give the season average data point.
	function geometricSum(chartUserVars, numSeasonsWithShow, currentSeasonIndexMatch, weightedSeasonMidPointData) {

		// Some variables.
		var weightedSeasonMidPointElement = [];
		var k, weightedAverageDataPoint;

		// Set the weightedSeasonCounter up. Its value will depend upon the number of seasons with non-zero
		// shows that were watched. If there are at least maxSeasonsToAverage seasons where a show was watched
		// then the counter will be set to that value. Otherwise it will be set to how ever many seasons there
		// where when a show was watched.
		var weightedSeasonCounter = (numSeasonsWithShow >= chartUserVars.weightPrevSeasons) ? chartUserVars.weightPrevSeasons : numSeasonsWithShow;

		// Setup a variable for the total number of seasons to average over, as well as a counter for the
		// season being weighted. Finally we have a blank variable for the final average data point.
		var weightedSeasonMaxPoints = weightedSeasonCounter;
		var weightedDataPointCounter = 1;
		var weightedAverageTotalDataPoint = 0;
		var weightedAverageTotalNumSeriesElement = 0;

		// Loop backwards over the weighted midpoint data points, skipping every one where no shows aired
		// during that season. 
		for (k = currentSeasonIndexMatch; k > 0; k--) {

			// Cached Array.
			weightedSeasonMidPointElement = weightedSeasonMidPointData[k];

			// Ignore seasons with zero shows.
			if (weightedSeasonMidPointElement['seasonSummedShows'] > 0) {

				// Pass relavent parameters to the weighted-average-forumla function. This is added to the total
				// data point variable, and the data point counter is incremented.
				weightedAverageDataPoint = geometricWeight(chartUserVars.weightGeoSeriesAPar, weightedDataPointCounter, weightedSeasonMaxPoints, weightedSeasonMidPointElement['seasonSummedScores'], weightedSeasonMidPointElement['seasonSummedShows']);
				weightedAverageTotalDataPoint = weightedAverageTotalDataPoint + weightedAverageDataPoint;
				weightedAverageTotalNumSeriesElement = weightedAverageTotalNumSeriesElement + weightedSeasonMidPointElement['seasonSummedShows'];
				weightedDataPointCounter++;

				// Decrement the weighted season counter.
				weightedSeasonCounter--;
			}

			// Quit loop once the required number of seasons have been looped over.
			if (weightedSeasonCounter == 0) {
				break;
			}
		}


		var weightedReturnData = {
			totalDataPoint:		weightedAverageTotalDataPoint,
			totalNumSeries:		weightedAverageTotalNumSeriesElement
		};

		return weightedReturnData;
	}

	// Calculates a y-coordinate between two y-points given its corresponding x-coordinate and two x-points
	function yEdgePoint(xEdgePoint, xOnePoint, xTwoPoint, yOnePoint, yTwoPoint) {

		// Round to two decimal places.
		yOnePoint = Math.round(yOnePoint * 100) / 100;
		yTwoPoint = Math.round(yTwoPoint * 100) / 100;
	
		var yReturnPoint = ( ( (xEdgePoint - xOnePoint) / (xTwoPoint - xOnePoint) ) * (yTwoPoint - yOnePoint) ) + yOnePoint;
		return Math.round(yReturnPoint * 100) / 100;
	}

	// Creates a hidden point that can be inserted into the start/end of a series of points
	function hiddenPoint(xValHidden, yValHidden, pointColour, lineColour) {

		var hiddenDataPoint = {
				name: 'hidden',
				x: xValHidden,
				y: yValHidden,
				marker: { enabled: false, states: { hover: { radius: 1, fillColor: pointColour, lineColor: lineColour } } }
		};

		return hiddenDataPoint;
	}

	// Create the HTML Canvas graph. We'll assign the function to the jQuery object so that
	// we can call it from another jQuery scope.
	$.anime_chart = function barcharty($xmlObj, divID, chartDataVars, xmlColHead) {

		// Variable sanity check
		if ((chartDataVars.lowYear < chartDataVars.highYear) && (chartDataVars.lowRatingVisible <= chartDataVars.highRatingVisible)) {



			// Create list of years, months (for the seasons) & scores.
			// Note that the javascript Date function has the months starting
			// from the number zero (i.e. 0 = Jan, 3 = Apr, 6 = Jul, 9 = Oct)
			var yearListArray = createValueRange(chartDataVars.lowYear, chartDataVars.highYear);
			var seasonMonthNumberArray = [0, 3, 6, 9];
			var scoreListArray = createValueRange(1, 10);

			var langVars = languageStrings();
			var colourVars = colourStrings();
			var fontVars = fontSettings();
			var plotVars = plotSettings();
			var yearAreaColourBackground = colourVars.yearColourBackground;

			var i, j, k, m, n;


			// Create a list of dates which we'll later use to determine the average score of all
			// anime shows shown up to (and including) that point in time.

			// We'll create a variable (seasonEndPointLeftBoundary) with a date before the first year we want to look 
			// for anime shows in, so we can have a graph line extending to the edge of the left graph side. We'll create
			// a second variable (seasonEndPointRightBoundary) with a date just after the last point so we can extend the
			// graph line to the right chart edge. We'll also add a date to the end of the year range (see the '1' in the
			// timestampDataPoints function call) so that we can determine the midpoint between the final point and the one
			// after the range.
			var seasonEndPointVars = timestampDataPoints(yearListArray, seasonMonthNumberArray, 0, 1);
			var seasonEndPointArray = seasonEndPointVars.points;
			var seasonEndPointLeftBoundary = seasonEndPointVars.outsideLeftBoundary;
			var seasonEndPointRightBoundary = seasonEndPointVars.outsideRightBoundary;
			var seasonEndPointLeftInBoundary = seasonEndPointVars.insideLeftBoundary;
			var seasonEndPointRightInBoundary = seasonEndPointVars.insideRightBoundary;


			// Variable for the weighted culmative average series. We are trying to obtain a list-range of season dates
			// before the first year where we'll be plotting data. That way we can weight the first data point with
			// data from previous seasons ; how many previous seasons is determined by: chartDataVars.weightPrevSeasons
			// This variable has been multiplied by 2 because there may be some seasons where no series were watched,
			// and such seasons won't be counted for the weighted culmative average.
			if (chartDataVars.enableWeightSeries == true) {
				var weightedSeasonEndPointVars = timestampDataPoints(yearListArray, seasonMonthNumberArray, 2 * chartDataVars.weightPrevSeasons, 1);
				var weightedSeasonEndPointArray = weightedSeasonEndPointVars.points;
			}


			// Loop over seasonEndPointArray and setup seasonMidPointArray. We'll be adjusting the point at which we'll be
			// evaluting the anime rating average based on the midpointSeasonDecimal variable. This is a number between
			// 0 and 1. We'll take the difference between the nth and (n+1)th dates, multiplying it by midpointSeasonDecimal
			// and then adding this time to the nth date. This will give us a 'mid-point' in each season to evaulate the animes
			// the finished in the preceding season. The new array we'll be creating will have elements formatted as follows:
			//
			//		array => (midpointDate, summedScores, summedShows, recentShows, midpointAverageScore)
			//
			//			where:	midpointDate:			The date up to (and including) which all animes which have started/finished will be considered.
			//
			//											for i = 0:		anime end date <= date[0] 
			//												    1:		anime end date <= date[1]
			//												    2:		anime end date <= date[2] ... etc
			//
			//					summedScores:			All of the anime scores that satisfy the above criteria added togeather.
			//					summedShows:			The number of anime series that satisfy the above criteria.
			//					recentShows:			A 2D array containing the series names, scores, & string width in pixels (for the series names)
			//											that have started/ended between the current date value and the previous date value.
			//					midpointAverageScore:	The average series rating for shows that have just started/finished.
			var seasonEndPointArrayLength = seasonEndPointArray.length;
			var seasonMidPointDate, seasonMidPointElement;
			var seasonMidPointArray = [];

			for (i = 0; i < (seasonEndPointArrayLength - 1); i++) {
				seasonMidPointDate = midpointCalc(seasonEndPointArray[i], seasonEndPointArray[i+1], chartDataVars.midpointSeasonDecimal);

				seasonMidPointElement							= [];
				seasonMidPointElement['midpointDate']			= seasonMidPointDate;
				seasonMidPointElement['summedScores']			= 0;
				seasonMidPointElement['summedShows']			= 0;
				seasonMidPointElement['recentShows']			= [];
				seasonMidPointElement['midpointAverageScore']	= langVars.emptyString;

				seasonMidPointArray[i] = seasonMidPointElement;
			}

			// Mid-point before the first mid-point (and after the last mid-point) so that we can calculate which series started/finished a few months
			// before the first point (or just a few months after the last mid-point).
			// NOTE: These variables will also be used if the option for having the graph extend to the left boundary has been selected, so that
			//		 we can determine the (x,y) values of where the graph line should extend to. The x-value is the left-edge graph boundary
			//		 x-value, and the y-value will be calculated (later on) as follows:
			//
			//		 y-value = [ (x-value - seasonMidPointLeftBoundary) / (firstMidPoint-x-value - seasonMidPointLeftBoundary) ] * [firstMidPoint-y-value - seasonMidPointLeftBoundary-y-value]
			//					+	seasonMidPointLeftBoundary-y-value
			//
			//		 where:		seasonMidPointLeftBoundary			is the x-value of the midPoint before the left boundary.
			//					seasonMidPointLeftBoundary-y-value	is seasonMidPointLeftBoundary's  corresponding y-value.
			//					firstMidPoint-x-value				is the x-value for the first mid-point shown on the graph.
			//					firstMidPoint-y-value				is the corresponding y-value of the first mid-point shown on the graph.
			var seasonMidPointLeftBoundary = midpointCalc(seasonEndPointLeftBoundary, seasonEndPointArray[0], chartDataVars.midpointSeasonDecimal);
			var seasonMidPointRightBoundary = midpointCalc(seasonEndPointRightInBoundary, seasonEndPointRightBoundary, chartDataVars.midpointSeasonDecimal);


			// Loop over weightedSeasonEndPointArray and setup weightedSeasonMidPointArray, as above. This array will have the
			// following structure:
			//
			//		array => (midpointDate, seasonSummedScores, seasonSummedShows)
			//
			//			where:	midpointDate:			The date for which animes which finished/started 3 months prior to will be considered.
			//					seasonSummedScores:		All of the anime scores that satisfy the above criteria added togeather.
			//					seasonSummedShows:		The number of anime series that satisfy the above criteria.
			var weightedSeasonMidPointArray = [];

			if (chartDataVars.enableWeightSeries == true) {

				var weightedSeasonEndPointArrayLength = weightedSeasonEndPointArray.length;
				var weightedSeasonMidPointDate, weightedSeasonMidPointElement;

				for (i = 0; i < (weightedSeasonEndPointArrayLength - 1); i++) {
					weightedSeasonMidPointDate = midpointCalc(weightedSeasonEndPointArray[i], weightedSeasonEndPointArray[i+1], chartDataVars.midpointSeasonDecimal);

					weightedSeasonMidPointElement							= [];
					weightedSeasonMidPointElement['midpointDate']			= weightedSeasonMidPointDate;
					weightedSeasonMidPointElement['seasonSummedScores']		= 0;
					weightedSeasonMidPointElement['seasonSummedShows']		= 0;

					weightedSeasonMidPointArray[i] = weightedSeasonMidPointElement;
				}

				// Mid-point before the first midpoint (after the last mid-point) so that we can calculate which series started/finished
				// a few months before the first point (and after the last point).
				var weightedSeasonMidPointLeftBoundary = midpointCalc(seasonEndPointLeftBoundary, seasonEndPointArray[0], chartDataVars.midpointSeasonDecimal);
				var weightedSeasonMidPointRightBoundary = midpointCalc(seasonEndPointRightInBoundary, seasonEndPointRightBoundary, chartDataVars.midpointSeasonDecimal);
			}




			// Loop over the score list so we can create an array for each score. The elements
			// in this array (scoreArray) will be the number of animes recieving that score in
			//  a given year. e.g.:
			//
			//		6/10 array =>  ([2005] => 5, [2006] => 2, [2007] => 3, ...)
			//
			// So in 2005 there were five animes with a score of 6/10, in 2006 there were two,
			// in 2007 there were 3, etc. We'll be using index numbers 0,1,2,3,.. for the array
			// elements rather than years but otherwise the format is as shown in the example.
			//
			// Each of these 'rating' arrays will be placed into a single containing array,
			// (scoreArray) giving us a single 2D array.
			var scoreListArrayLength = scoreListArray.length;
			var yearListArrayLength = yearListArray.length;
			var seasonMidPointArrayLength = seasonMidPointArray.length;
			var weightedSeasonMidPointArrayLength = weightedSeasonMidPointArray.length;
			var recentlyStartedFinishedShow = [];
			var showNameListByRating = [];
			var scoreArray = [];
			var seasonMidPointLeftBoundarySummedScores = 0;
			var seasonMidPointLeftBoundarySummedShows = 0;
			var seasonMidPointRightBoundarySummedScores = 0;
			var seasonMidPointRightBoundarySummedShows = 0;
			var weightedSeasonMidPointRightBoundarySummedScores = 0;
			var weightedSeasonMidPointRightBoundarySummedShows = 0;

			var yearArray, blankArray, showNameListRatingElement, currentScoreColVal, currentYearColText, currentYearColVal, currentShowTitleColVal, currentShowStatusColVal;
			var currentShowStartEndDate, currentShowStartEndYear, currentShowStartEndMonth, currentShowStartEndDay, currentShowStartEndUTC, previousSeasonMidPointArray;
			var recentlyStartedFinishedShowIndex, previousWeightedSeasonMidPointArray;

			for (i = 0; i < scoreListArrayLength; i++) {

				// Create a blank array, where each element is set to 0, and the number of elements
				// is given by the number of years in yearListArray
				yearArray = createEmptyArray(yearListArrayLength, 0);

				// Create a blank array which is a series of arrays in which we can insert show title elements.
				// This array (showNameListByRating) is similar in structure to scoreArray except that it will
				// look as follows:
				//
				//	6/10 array =>  ([2005] => [], [2006] => ['Title 01', 'Title 02'], [2007] => ['Show title 01'], ...)
				blankArray = '';
				showNameListRatingElement = createEmptyArray(yearListArrayLength, blankArray);


				// Loop over every XML <row> (except the first as it only has the titles), and then select only
				// the columns that have the score and year in them. The .find selects <row> elements and
				// the .each allows us to iterate over each <row> element.
				$xmlObj.find('anime').each(function(j, rowVal) {

					
					// Set pointer to rowVal object.
					$rowVal = $(rowVal);

					// Set variables to the score & year text. There are several things going on in
					// these lines:
					//
					//	$rowVal			-	The object containing the data for each XML <anime>
					//						(i.e. <my_> elements).
					//	.find(col)		-	Find <my_> elements in the $rowVal object.
					//	.get(0)			-	Get only the 0th <my_> element (as only one record should be found).
					//	$(...)			-	The object containing the <my_> element.
					//	.text()			-	Return the text in <my_> element.
					//	parseInt(_, 10)	-	Convert the <my_> element text to an integer (as the
					//						elements in scoreListArray & yearListArray are integers,
					//						so we need these to be integers for comparison). The 10
					//						converts integers correctly as 08 would translate to 0.
					currentScoreColVal = parseInt($($rowVal.find(xmlColHead.ratingColumn).get(0)).text(), 10);
					currentYearColText = $($rowVal.find(xmlColHead.barchartRatingDate).get(0)).text().substr(0,4);
					currentYearColVal = parseInt(currentYearColText, 10);
					currentShowTitleColVal = $($rowVal.find(xmlColHead.showTitleColumn).get(0)).text();
					currentShowStatusColVal = $($rowVal.find(xmlColHead.showStatusColumn).get(0)).text();
					
					// Only continue if the series is complete, and it has a start/end date.
					if ( (currentShowStatusColVal == 'Completed') && (currentYearColText != '0000') ) {

						// Check if the anime score matches the current score in scoreListArray that
						// we're looking for.
						if (scoreListArray[i] == currentScoreColVal) {

							// Now we loop through each of the years in yearListArray and see if the
							// anime was aired in one of those years. If it was, then we can increment
							// the year element for that year yearArray. Furthermore we'll add that
							// show's title to showNameListRatingElement.
							for (k = 0; k < yearListArrayLength; k++) {

								// Increment year record in yearArray & break the for loop. As an anime
								// can only air in one year we don't need to keep looking once a match
								// has been found. Add the show title to its array as well.
								if (yearListArray[k] == currentYearColVal) {

									if (showNameListRatingElement[k] == '') {
										showNameListRatingElement[k] = [];
										showNameListRatingElement[k][0] = currentShowTitleColVal;
									} else {
										showNameListRatingElement[k][showNameListRatingElement[k].length] = currentShowTitleColVal;
									}

									yearArray[k]++;
									break;
								}
							}
						}


						// Next up we'll populate the seasonMidPointArray array. We only need to do this
						// once so there's no need to do this for i = 1, 2, 3, etc
						if (i == 0) {

							// Grab the current anime start/end-date, and extract the year, month & day.
							// Convert these to Integers & then create a UTC timestamp from them.
							// Note that we use parseFloat rather than parseInt has the Int function
							// cannot convert strings with leading zeroes (e.g. 09) to numbers.
							currentShowStartEndDate = $($rowVal.find(xmlColHead.culmativeAverageRatingDate).get(0)).text();
							currentShowStartEndYear = parseInt(currentShowStartEndDate.substr(0,4), 10);
							currentShowStartEndMonth = parseFloat(currentShowStartEndDate.substr(5,2), 10) - 1;
							currentShowStartEndDay = parseFloat(currentShowStartEndDate.substr(8,2), 10);
							currentShowStartEndUTC = Date.UTC(currentShowStartEndYear, currentShowStartEndMonth, currentShowStartEndDay);

							// If the start/end date is not set then we'll want to NOT
							// add the show to the array... (i.e. skip adding it).
							if (currentShowStartEndDate != '0000-00-00') {


								// Loop over each of the mid-point timestamps and check if the anime has started/finished
								// by that point. If so, increment the show counter & add the show rating.
								for (m = 0; m < seasonMidPointArrayLength; m++) {

									// Cached array.
									seasonMidPointElement = seasonMidPointArray[m];

									if (currentShowStartEndUTC <= seasonMidPointElement['midpointDate']) {
										seasonMidPointArray[m]['summedScores'] = seasonMidPointElement['summedScores'] + currentScoreColVal;
										seasonMidPointArray[m]['summedShows']++;

										// Determine the previous seasonMidPoint timestamp...
										previousSeasonMidPointArray = (m == 0) ? seasonMidPointLeftBoundary : seasonMidPointArray[m - 1]['midpointDate'];

										// If a show has started/finished before the current seasonMidPoint timestamp,
										// but after the previous one then we'll add the show name & score to seasonMidPointArray
										if (currentShowStartEndUTC > previousSeasonMidPointArray) {

											recentlyStartedFinishedShow = [];
											recentlyStartedFinishedShow['showTitle']		= currentShowTitleColVal;
											recentlyStartedFinishedShow['score']			= currentScoreColVal;

											recentlyStartedFinishedShowIndex = seasonMidPointElement['recentShows'].length;
											seasonMidPointArray[m]['recentShows'][recentlyStartedFinishedShowIndex] = recentlyStartedFinishedShow;
										}
									}
								}

								// If the option for having the graph extend over the left boundary has been selected then we need to calculate the
								// y-coordinate for the left-boundary mid-point.
								if (chartDataVars.enableLeftEdgeSpline == true) {

									// Determine the number of shows aired before the left-boundary point & the total score
									if (currentShowStartEndUTC <= seasonMidPointLeftBoundary) {
										seasonMidPointLeftBoundarySummedScores = seasonMidPointLeftBoundarySummedScores + currentScoreColVal;
										seasonMidPointLeftBoundarySummedShows++;
									}
								}

								// Same as above but for the right boundary point...
								if (chartDataVars.enableRightEdgeSpline == true) {

									// Determine the number of shows aired before the left-boundary point & the total score
									if (currentShowStartEndUTC <= seasonMidPointRightBoundary) {
										seasonMidPointRightBoundarySummedScores = seasonMidPointRightBoundarySummedScores + currentScoreColVal;
										seasonMidPointRightBoundarySummedShows++;
									}
								}


								// For the weighted culmative average series we need to loop over its mid-point timestamps, check if the anime
								// started/finished in the previous 3 months, and then if so, increment the show counter & add the show rating.
								if (chartDataVars.enableWeightSeries == true) {
									for (n = 0; n < weightedSeasonMidPointArrayLength; n++) {

										// Determine the previous seasonMidPoint timestamp...
										previousWeightedSeasonMidPointArray = (n == 0) ? weightedSeasonMidPointLeftBoundary : weightedSeasonMidPointArray[n - 1]['midpointDate'];

										if ( (currentShowStartEndUTC <= weightedSeasonMidPointArray[n]['midpointDate']) && (currentShowStartEndUTC > previousWeightedSeasonMidPointArray) ) {
											weightedSeasonMidPointArray[n]['seasonSummedScores'] = weightedSeasonMidPointArray[n]['seasonSummedScores'] + currentScoreColVal;
											weightedSeasonMidPointArray[n]['seasonSummedShows']++;
										}
									}


									// If the option for having the graph extend over the right boundary has been selected then we need to calculate the
									// y-coordinate for the right-boundary mid-point.
									if (chartDataVars.enableRightEdgeSpline == true) {

										// Determine the number of shows aired before the right-boundary point & the total score
										if ( (currentShowStartEndUTC <= weightedSeasonMidPointRightBoundary) && (currentShowStartEndUTC > weightedSeasonMidPointArray[weightedSeasonMidPointArrayLength - 1]['midpointDate']) ) {
											weightedSeasonMidPointRightBoundarySummedScores = weightedSeasonMidPointRightBoundarySummedScores + currentScoreColVal;
											weightedSeasonMidPointRightBoundarySummedShows++;
										}
									}
								}
							}
						}
					}
				});

				// Place yearArray into scoreArray.
				scoreArray[i] = yearArray;

				// Loop over each of the years in showNameListRatingElement & alphabetically organise the show titles.
				// Then add showNameListRatingElement to showNameListByRating.
				var showNameListRatingElementLength = showNameListRatingElement.length;

				for (p = 0; p < showNameListRatingElementLength; p++) {
					if (showNameListRatingElement[p] != '') {
						showNameListRatingElement[p].sort(simpleShowTitleSort);
					}
				}
				
				showNameListByRating[i] = showNameListRatingElement;
			}



			// Create the culmative average dataset.
			// Also sort the season shows in seasonMidPointArray[i]['recentShows']
			// in alphabetical ascending order.
			var weightedAverageTotalNumSeries = [];
			var seasonWeightedCulmativeAverage = [];
			var seasonCulmativeAverage = [];
			var weightedSeasonElement = [];
			var weightedSeasonLeftBoundaryShows = 0;

			var seasonCulmativeAverageValue, seasonMidPointArrayRecentShowsLength, midpointSummedScore, weightedSeasonsWithShow, weightedSeasonIndexMatch;
			var weightedSeasonLeftBoundaryIndex;

			for (i = 0; i < seasonMidPointArrayLength; i++) {

				// Sort recent shows alpabetically & create a cached array variable.
				seasonMidPointArray[i]['recentShows'].sort(showTitleSort);
				seasonMidPointElement = seasonMidPointArray[i];

				// Create culmative dataset
				seasonCulmativeAverageValue = Math.round( (seasonMidPointElement['summedScores'] / seasonMidPointElement['summedShows']) * 100 ) / 100;
				seasonCulmativeAverage[i] = [seasonMidPointElement['midpointDate'], seasonCulmativeAverageValue];
				
				// Determine the average recent show score.
				seasonMidPointArrayRecentShowsLength = seasonMidPointElement['recentShows'].length;

				if (seasonMidPointArrayRecentShowsLength > 0) {
					
					midpointSummedScore = 0;

					for (j = 0; j < seasonMidPointArrayRecentShowsLength; j++) {
						midpointSummedScore = midpointSummedScore + seasonMidPointElement['recentShows'][j]['score'];
					}

					seasonMidPointArray[i]['midpointAverageScore'] = Math.round( (midpointSummedScore / seasonMidPointArrayRecentShowsLength) * 100 ) / 100;
				}

				// Weighted culmative average series.
				// Reset some variables
				if (chartDataVars.enableWeightSeries == true) {
					weightedSeasonsWithShow = 0;
					weightedSeasonIndexMatch = 0;

					// We need to forward loop over each of the weighted midpoint items and count them till we come to the date
					// for the current midpoint item. We ignore any seasons where no shows were watched.
					for (j = 0; j < weightedSeasonMidPointArrayLength; j++) {

						// Cached array.
						weightedSeasonMidPointElement = weightedSeasonMidPointArray[j];

						// If we want the graph line to extend over the left boundary we need to calculate
						// the number of seasons where a show aired, and determine the j-index value of the
						// left-boundary mid-point timestamp. We only need to do this once, hence the i == 0,
						// check.
						if ( (chartDataVars.enableLeftEdgeSpline == true) && (i == 0) ) {

							// Number of seasons with a show.
							if ( (weightedSeasonMidPointLeftBoundary >= weightedSeasonMidPointElement['midpointDate']) && (weightedSeasonMidPointElement['seasonSummedShows'] > 0) ) {
								weightedSeasonLeftBoundaryShows++;
							}

							// Determine index.
							if (weightedSeasonMidPointLeftBoundary == weightedSeasonMidPointElement['midpointDate']) {
								weightedSeasonLeftBoundaryIndex = j;
							}
						}

						if (weightedSeasonMidPointElement['seasonSummedShows'] > 0) {
							weightedSeasonsWithShow++;
						}

						// Capture the index value at which the two midpoint dates match up, for the next for loop.
						if (seasonMidPointElement['midpointDate'] == weightedSeasonMidPointElement['midpointDate']) {
							weightedSeasonIndexMatch = j;
							break;
						}
					}


					// Calculate the geometric Sum for each season data point:
					weightedSeasonElement = geometricSum(chartDataVars, weightedSeasonsWithShow, weightedSeasonIndexMatch, weightedSeasonMidPointArray);


					// Add the weighted data point to the weighted series array.
					seasonWeightedCulmativeAverage[i] = [seasonMidPointElement['midpointDate'], Math.round(weightedSeasonElement.totalDataPoint * 100) / 100];
					weightedAverageTotalNumSeries[i] = weightedSeasonElement.totalNumSeries;
				}
			}

			
			// Determine the left & right boundary mid-point y-values for the standard graph line.
			if (chartDataVars.enableLeftEdgeSpline == true) {
				var seasonLeftBoundaryMidPointYCoord = seasonMidPointLeftBoundarySummedScores / seasonMidPointLeftBoundarySummedShows;
				var seasonLeftBoundaryYCoord = yEdgePoint(seasonEndPointLeftInBoundary, seasonMidPointLeftBoundary, seasonCulmativeAverage[0][0], seasonLeftBoundaryMidPointYCoord, seasonCulmativeAverage[0][1]);
				seasonCulmativeAverage.unshift(hiddenPoint(seasonEndPointLeftInBoundary, seasonLeftBoundaryYCoord, colourVars.culmativeAvgGraphColour, colourVars.culmativeAvgGraphColour));
			}
			
			if (chartDataVars.enableRightEdgeSpline == true) {
				// yEdgePoint(xEdgePoint, xOnePoint, xTwoPoint, yOnePoint, yTwoPoint)
				var seasonCulmativeAverageLength = seasonCulmativeAverage.length;
				var seasonRightBoundaryMidPointYCoord = seasonMidPointRightBoundarySummedScores / seasonMidPointRightBoundarySummedShows;
				var seasonRightBoundaryYCoord = yEdgePoint(seasonEndPointRightInBoundary, seasonCulmativeAverage[seasonCulmativeAverageLength - 1][0], seasonMidPointRightBoundary, seasonCulmativeAverage[seasonCulmativeAverageLength - 1][1], seasonRightBoundaryMidPointYCoord);
				seasonCulmativeAverage.push(hiddenPoint(seasonEndPointRightInBoundary, seasonRightBoundaryYCoord, colourVars.culmativeAvgGraphColour, colourVars.culmativeAvgGraphColour));
			}



			// Determine the left & right boundary mid-point y-values for the weighted graph line.
			if (chartDataVars.enableWeightSeries == true) {

				if (chartDataVars.enableLeftEdgeSpline == true) {
					var weightedSeasonLeftBoundaryElement = geometricSum(chartDataVars, weightedSeasonLeftBoundaryShows, weightedSeasonLeftBoundaryIndex, weightedSeasonMidPointArray);
					var weightedSeasonLeftBoundaryYCoord = yEdgePoint(seasonEndPointLeftInBoundary, weightedSeasonMidPointLeftBoundary, seasonWeightedCulmativeAverage[0][0], weightedSeasonLeftBoundaryElement.totalDataPoint, seasonWeightedCulmativeAverage[0][1]);
					seasonWeightedCulmativeAverage.unshift(hiddenPoint(seasonEndPointLeftInBoundary, weightedSeasonLeftBoundaryYCoord, colourVars.weightedCAvgGraphColour, colourVars.weightedCAvgGraphColour));
				}

				// For the weighted right-boundary mid-point we can use the final index value (weightedSeasonLeftBoundaryIndex), add 1 to it, and then insert
				// the right-boundary mid-point data into the: weightedSeasonMidPointArray (at the new index value) as we won't be needing it for anything else.
				// We can then pass this along to the geometricSum function to determine this boundary point's weighted score.
				if (chartDataVars.enableRightEdgeSpline == true) {
					var weightedSeasonRightBoundaryShows = (weightedSeasonMidPointRightBoundarySummedShows > 0) ? weightedSeasonsWithShow + 1 : weightedSeasonsWithShow;
					var weightedSeasonRightBoundaryIndex = weightedSeasonIndexMatch + 1;
					weightedSeasonMidPointArray[weightedSeasonRightBoundaryIndex] = [];
					weightedSeasonMidPointArray[weightedSeasonRightBoundaryIndex]['midpointDate'] = weightedSeasonMidPointRightBoundary;
					weightedSeasonMidPointArray[weightedSeasonRightBoundaryIndex]['seasonSummedScores'] = weightedSeasonMidPointRightBoundarySummedScores;
					weightedSeasonMidPointArray[weightedSeasonRightBoundaryIndex]['seasonSummedShows'] = weightedSeasonMidPointRightBoundarySummedShows;
					
					var seasonWeightedCulmativeAverageLength = seasonWeightedCulmativeAverage.length;
					var weightedSeasonRightBoundaryElement = geometricSum(chartDataVars, weightedSeasonRightBoundaryShows, weightedSeasonRightBoundaryIndex, weightedSeasonMidPointArray);
					var weightedSeasonRightBoundaryYCoord = yEdgePoint(seasonEndPointRightInBoundary, seasonWeightedCulmativeAverage[seasonWeightedCulmativeAverageLength - 1][0], weightedSeasonMidPointRightBoundary, seasonWeightedCulmativeAverage[seasonWeightedCulmativeAverageLength - 1][1], weightedSeasonRightBoundaryElement.totalDataPoint);
					seasonWeightedCulmativeAverage.push(hiddenPoint(seasonEndPointRightInBoundary, weightedSeasonRightBoundaryYCoord, colourVars.weightedCAvgGraphColour, colourVars.weightedCAvgGraphColour));					
				}
			}


			// Convert the year numbers in yearListArray to strings so that
			// HighCharts treats them as text labels rather than numbers.
			for (i = 0; i < yearListArrayLength; i++) {
				yearListArray[i] = yearListArray[i].toString();
			}

			// Tooltip strings used below. Sprintf functions will be used to insert variables into them.
			var lineBreak					= '<br />';
			var generalSpanStartString		= '<span style="font-size: ' + fontVars.generalFontSize + 'px;">';
			var verticalSpacingString		= lineBreak + '<span style="font-size: %spx; color: ' + colourVars.tooltipSpacingColour + ';">' + langVars.spacingString + '</span>';

			var tooltipTitleString			= '<span style="font-size: ' + fontVars.tooltipTitleFontSize + 'px;">' + '%s</span>';
			var tooltipSubTitleString		= lineBreak + '<span style="color:%s;">%s</span>: <b>%s</b>';
			var catNameStringStyle			= lineBreak + '<span style="font-size: ' + fontVars.generalFontSize + 'px; font-weight: bold;">%s</span>';
			var catVarStringStyle			= lineBreak + generalSpanStartString + ' - %s - %s</span>';
			var catSingleStringStyle		= lineBreak + generalSpanStartString + ' - %s</span>';
			var mediumVerticalSpacingString	= sprintf(verticalSpacingString, fontVars.spacingStringMediumSize);
			var smallVerticalSpacingString	= sprintf(verticalSpacingString, fontVars.spacingStringSmallSize);


			// Now we'll setup the graph variables.
			var options = {
				// Set Colours
				colors: colourVars.barColours,

				// Graph type & div ID to render to.
				chart: {
					renderTo: divID,
					backgroundColor: colourVars.chartBackgroundColour
				},
				
				tooltip: {
					formatter: function() {

						// Hide edge point tooltips:
						if (this.point.name == 'hidden') {

							return false;

						// Show all others
						} else {

							// Determine if we're dealing with a datetime data type... Plus some common strings we'll need.
							var isDateTimeType = (this.series.xAxis.options.type == 'datetime') ? true : false;
							var startedFinishedString = (xmlColHead.culmativeAverageRatingDate == 'Start date') ? langVars.startedHoeverLabel : langVars.finishedHoeverLabel;
							var numRecentShowsString = sprintf(langVars.numRecentShowsHoverLabel, startedFinishedString);
							var recentShowAvgString = sprintf(langVars.recentShowAvgHoverLabel, startedFinishedString);
							var recentShowRatingString = sprintf(langVars.recentShowRatingHoverLabel, startedFinishedString);

							// Recreate the standard data-point tooltip. Convert any timestamps to dates.
							var tooltipText = sprintf(tooltipTitleString, (isDateTimeType ? Highcharts.dateFormat('%A, %b %e, %Y', this.x) : this.x));
							tooltipText += smallVerticalSpacingString;
							tooltipText += sprintf(tooltipSubTitleString, this.series.color, this.series.name, this.point.y);

							// For datetime datapoints (i.e. the culmative average rating data series), we'll be
							// adding some extra stats, plus the series that have recently started/finished.
							if (isDateTimeType) {

								// Determine if the datetimetype is also a weighted or non-weighted series.
								// Plus we set the strings/data that depend on this check.
								var isWeightedSeries = (this.series.name == langVars.weightCulmAvgSeriesTitle) ? true : false;
								var totalNumShowsString = (isWeightedSeries) ? sprintf(langVars.weightAvgShowsHoverLabel, startedFinishedString) : sprintf(langVars.totalNumShowsHoverLabel, startedFinishedString);

								// Define some variables.
								var showItems, numShowItems, totalNumAveragedSeries;

								// Loop over each of the SeasonMidPoint elements, till we find
								// the one correspobding to the data point being highlighted.
								for (i = 0; i < seasonMidPointArrayLength; i++) {

									// Cached array.
									seasonMidPointElement = seasonMidPointArray[i];

									if (this.x == seasonMidPointElement['midpointDate']) {

										// Simplfying the variable calls.
										showItems = seasonMidPointElement['recentShows'];
										numShowItems = showItems.length;
										totalNumAveragedSeries = (isWeightedSeries) ? weightedAverageTotalNumSeries[i] : seasonMidPointElement['summedShows'];

										// Other statistics
										tooltipText += mediumVerticalSpacingString;
										tooltipText += sprintf(catNameStringStyle, langVars.otherStatsHoverLabel);
										tooltipText += sprintf(catVarStringStyle, totalNumShowsString, totalNumAveragedSeries);
										tooltipText += sprintf(catVarStringStyle, numRecentShowsString, numShowItems);
										tooltipText += sprintf(catVarStringStyle, recentShowAvgString, seasonMidPointArray[i]['midpointAverageScore']);

										// Shows that have recently started/finished
										tooltipText += mediumVerticalSpacingString;
										tooltipText += sprintf(catNameStringStyle, recentShowRatingString);


										// Loop over each of the show items if there are any...
										if (numShowItems > 0) {
											for (j = 0; j < numShowItems; j++) {
												tooltipText += sprintf(catVarStringStyle, showItems[j]['showTitle'], showItems[j]['score']);
											}
										} else {
											tooltipText += sprintf(catSingleStringStyle, langVars.noShowsHoverLabel);
										}
									}
								}
							// If not a date type then we're dealing with the bar chart data.
							} else {
								
								var scoreID, scoreParts, yearID, showTitleTooltipArray;

								// Loop over yearListArray to find the array key/id for the year that
								// the data point belongs to. We can break the loop once done, as we're
								// only searching for one ID.
								for (j = 0; j < yearListArray.length; j++) {
									if (this.x == yearListArray[j]) {
										yearID = j;
										break;
									}
								}

								// Split the score name (e.g. 2/10), grab the first part (the: 2),
								// and since the scores preceed from 1 to 10 we need only subtract 1
								// from the score to obtain the score array key/ID.
								scoreParts = this.series.name.split('/');
								scoreID = scoreParts[0] - 1;

								showTitleTooltipArray = showNameListByRating[scoreID][yearID];

								// Loop over the show titles and display them.
								tooltipText += mediumVerticalSpacingString;
								tooltipText += sprintf(catNameStringStyle, langVars.showsHoverLabel);

								for (k = 0; k < showTitleTooltipArray.length; k++) {
									tooltipText += sprintf(catSingleStringStyle, showTitleTooltipArray[k]);
								}
							}
										
							// Final spacing
							tooltipText += mediumVerticalSpacingString;
							return tooltipText;
						}
					}
				},

				// Disable credit notification on the graph.
				credits: {
					enabled: false
				},

				// Disable graph animation & set the bar chart
				// group spacing to a smaller value.
				plotOptions: {
					series: {
						groupPadding: 0.05,
						animation: plotVars.animatedDrawOut
					}
				},

				// Graph title.
				title: {
					text: langVars.chartTitleText
				},

				// Graph legend
				legend: {
					margin: 25
				},

				// x-axis title & category list (i.e. the years)
				xAxis: [{
					title: {
						text: langVars.yearAxisTitle,							
						style: {
							color: colourVars.yearAxisTitleColour
						}
					},
					categories: yearListArray
				},{
					type: 'datetime',
					opposite: true,
					min: Date.UTC(chartDataVars.lowYear, 0, 1),
					max: Date.UTC(chartDataVars.highYear + 1, 0, 1),
					plotBands: []
				}],

				// y-axis title (the number of animes).
				yAxis: [{
					title: {
						text: langVars.numShowsAxisLabel,							
						style: {
							color: colourVars.numShowsAxisTitleColour
						}
					},
					min: chartDataVars.lowNumberShows,
					max: chartDataVars.highNumberShows,
					tickInterval: chartDataVars.tickNumberShows,
					endOnTick: false
				},

				// second y-axis title with the average rating.
				{
					title: {
						text: langVars.ratingAxisLabel,							
						style: {
							color: colourVars.ratingAxisTitleColour
						}
					},
					min: chartDataVars.lowAverageRating,
					max: chartDataVars.highAverageRating,
					tickInterval: chartDataVars.tickAverageRating,
					opposite: true,
					endOnTick: false
				}],

				// The x-axis series (each graph vertical-bar for each year).
				series: []
			};

			// Define the background plot colours for each year. We set the
			// bacground colour counter to zero first of all.
			var yearColourBackgroundCounter = 0;
			var yearColourBackgroundItem;

			for (i = 0; i < yearListArray.length; i++) {

				// Create the plot background item & insert it into the options array.
				yearColourBackgroundItem = {
						color: yearAreaColourBackground[yearColourBackgroundCounter],
						from: Date.UTC(yearListArray[i], 0, 1),
						to: Date.UTC(yearListArray[i] + 1, 0, 1)
				};
				
				options.xAxis[1].plotBands.push(yearColourBackgroundItem);

				// Increment the counter for the background colour list.
				yearColourBackgroundCounter++;

				// If the counter reachers the length of the background colour list
				// then we need to reset the counter back to zero so the first colour
				// is picked again.
				if (yearColourBackgroundCounter == yearAreaColourBackground.length) {
					yearColourBackgroundCounter = 0;
				}
			}

			// Here we setup each x-axis series. Each series is simply a series name
			// with series data. The name will come from the nth element in  scoreListArray,
			// whilst the data will come from the nth array in scoreArray. We'll loop over
			// scoreArray, and populate the seriesOptions array to provide the graph this
			// series information.
			var seriesLabelNoData = '';
			var seriesVisible;

			for (i = 0; i < scoreArray.length; i++) {

				// Setup the series visibility (if there are no years with an anime at
				// that rating, we'll hide the series. We'll presume to hide the series
				// but if we find one year where an anime had a rating then we can show
				// the series
				seriesVisible = false;
				seriesLabelNoData = langVars.noDataSeriesLabel;

				// The loop will be broken once a year with a rating has been found.
				for (j = 0; j < scoreArray[i].length; j++) {
					if (scoreArray[i][j] > 0) {
						seriesVisible = true;
						seriesLabelNoData = '';
						break;
					}
				}

				// Set the visibility of the data series to false if requested to be so...
				if (isWithinRange(i + 1, chartDataVars.lowRatingVisible, chartDataVars.highRatingVisible) == false) {
					seriesVisible = false;
				}


				// Setup the name & data for each series
				var seriesOptions = {
					name: scoreListArray[i].toString() + langVars.divByTen + seriesLabelNoData,
					type: 'column',
					data: scoreArray[i],
					visible: seriesVisible
				};

				// Add each series to the series array above.
				options.series.push(seriesOptions);
			}

			// Place the culmative average data into the series array.
			var seriesOptions = {
				name: langVars.culmativeAvgSeriesTitle,
				color: colourVars.culmativeAvgGraphColour,
				type: 'spline',
				data: seasonCulmativeAverage,
				marker: { 
							symbol: plotVars.culmativeAvgGraphSymbol,
							radius: plotVars.culmativeAvgGraphSymSize
						},
				xAxis: 1,
				yAxis: 1
			}
			options.series.push(seriesOptions);

			// Place the weighted culmative average data into a series array. We'll only display this if
			// enableWeightSeries is set to true.
			if (chartDataVars.enableWeightSeries == true) {
				var seriesOptions = {
					name: langVars.weightCulmAvgSeriesTitle,
					color: colourVars.weightedCAvgGraphColour,
					type: 'spline',
					data: seasonWeightedCulmativeAverage,
					marker: { 
								symbol: plotVars.weightedCAvgGraphSymbol,
								radius: plotVars.weightedCAvgGraphSymSize
							},
					xAxis: 1,
					yAxis: 1
				}
				options.series.push(seriesOptions);
			}

			// Output the chart
			var chart = new Highcharts.Chart(options);

		// End Sanity check
		}
	// End graph.
	}
	
// End jQuery scope.
});
