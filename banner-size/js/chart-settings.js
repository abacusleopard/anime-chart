// ====================================================================
// Language strings, Colour settings, & Font settings.


// Edit/Translate these strings as necessary.
function languageStrings() {

	var languageVariables = {
		chartTitleText:				'',											// Chart title.
		cumulativeAvgSeriesTitle:	'Cumul. avg. rating',						// Cumulative average series line  title.
		weightCumulAvgSeriesTitle:	'Weight. cumul. avg.',						// Weighted cumulative average series line title.
		yearAxisTitle:				'Year',										// Year axis title (on the bottom horizontal axis).
		numShowsAxisLabel:			'Number of shows',							// Number of shows axis label (on the left vertical axis).
		ratingAxisLabel:			'Rating (out of 10)',						// Rating axis label (on the right vertical axis).
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
		chartBackgroundColour:		'none',							// Background colour for the chart. Set to none for a transparent background.
		tooltipSpacingColour:		'#ffffff',						// Tooltip colour used for spacing characters. The colour is set to white so the spacing characters appear transparent.
		cumulativeAvgGraphColour:	'#0fade1',						// Graph line & point colour for the cumulative average series.
		weightedCAvgGraphColour:	'#e1bc0f'						// Graph line & point colour for the weighted cumulative average series.
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

// A couple of settings for the plot (e.g. animated graphs, marker types, legend & export button positions etc).
function plotSettings() {

	var plotDisplayVariables = {
		animatedDrawOut:			false,		// Controls the animated drawing of the graph when first loaded.
		cumulativeAvgGraphSymbol:	'circle',	// Data point indicator for the cumulative average curve.
		weightedCAvgGraphSymbol:	'square',	// Data point indicator for the weighted cumulative average curve.
		cumulativeAvgGraphSymSize:	4,			// Data point indicator size for the cumulative average curve.
		weightedCAvgGraphSymSize:	4,			// Data point indicator size for the weighted cumulative average curve.
		legendItemTopMargin:		3,			// Top margin (in pixels) for the items in the graph legend.
		legendItemBottomMargin:		3,			// Bottom margin (in pixels) for the items in the graph legend.
		legendBorderPadding:		6,			// Padding (in pixels) between the legend border and legend items.
		legendMarginPixels:			0,			// Margin (in pixels) between the graph legend and the chart.
		legendAlignment:			'right',	// Horizontal alignment for the legend in the graph area.
		legendVerticalAlignment:	'top',		// Vertical alignment for the legend in the graph area.
		legendWidth:				140,		// Legend width (in pixels). Set to 0 or false to allow automatic width detection.
		legendMaxHeight:			180,		// Legend height (in pixels). Set to 0 or false to allow automatic height detection.
		legendXOffset:				0,			// Horizontal offset for the legend position (in pixels).
		legendYOffset:				5,			// Vertical offset for the legend position (in pixels).
		exportButtonsAlignment:		'left',		// Horizontal alignment for the export buttons.
		exportButtonsVerticalAlign:	'bottom',	// Vertical alignment for the export buttons.
		exportImgButtonXOffset:		50,			// Horizontal offset (in pixels) for the image export button.
		exportPrtButtonXOffset:		20,			// Horizontal offset (in pixels) for the print export button.
		exportButtonsYOffset:		-20			// Vertical offset (in pixels) for both export buttons.
	}

	return plotDisplayVariables;
}