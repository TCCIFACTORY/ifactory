(function umd(root, name, factory) {
  'use strict';
  if ('function' === typeof define && define.amd) {
    // AMD. Register as an anonymous module.
    define(name, ['jquery'], factory);
  } else {
    // Browser globals
    root[name] = factory();
  }
}(this, 'ReportOverviewModule', function UMDFactory() {
  'use strict';

  var ReportOverview = ReportOverviewConstructor;

  reportCircleGraph();

  return ReportOverview;

  function ReportOverviewConstructor(options) {

    var factory = {
        init: init
      },

      _elements = {
        $element: options.element
      };

    init();

    return factory;

    function init() {

      _elements.$element.append($(getTemplateString()));

      $('.delivery-rate').percentCircle({
        width: 130,
        trackColor: '#ececec',
        barColor: '#f5ab34',
        barWeight: 5,
        endPercent: 0.9,
        fps: 60
      });

      $('.open-rate').percentCircle({
        width: 130,
        trackColor: '#ececec',
        barColor: '#f5ab34',
        barWeight: 5,
        endPercent: 0.99,
        fps: 60
      });

      $('.click-to-open').percentCircle({
        width: 130,
        trackColor: '#ececec',
        barColor: '#80cdbe',
        barWeight: 5,
        endPercent: 0.5,
        fps: 60
      });
    }

    function getTemplateString() {
      return [
        '<div>',
        '<input class="back" type="button" value="Voltar" onClick="history.go(-1)">',
        '<h2>Fabrica</h2>',
        '<div class="row" >', 
        '<div class="col-md-12">',

        '<div class="report-statistic-box">',
        '<div  class="box-header"> Linha A </div>',
        '<div class="box-content delivery-rate">',
        '<div class="percentage"><a href="https://tccifactory.github.io/ifactory/Linha/dist/detalhes/produtoA/linha1.html" style="text-decoration:none" >90%<a/></div>',
        
        '</div>',
        '<div class="box-foot">',
        '<span class="arrow arrow-up"></span>',
        '<div class="box-foot-left">PLAN<br><span class="box-foot-stats"><strong>{{delivered}}</strong></span></div>'.replace(/{{delivered}}/, options.data.delivered),
        '<span class="arrow arrow-down"></span>',
        '<div class="box-foot-right">REAL<br><span class="box-foot-stats" title="% = unopened emails / delivered emails"><strong>716</strong></span></div>',
        '<div >ACC<br><span><strong>648</strong></span></div>',
        '</div>',
        '<P> <div><br><span><strong>Produto A</strong></span></div>',
        '</div>',

        '<div class="report-statistic-box">',
        '<div class="box-header"> Linha B </div>',
        '<div class="box-content open-rate">',
        '<div class="percentage"><a href = "https://tccifactory.github.io/ifactory/Linha/dist/detalhes/produtoB/linha2.html" style="text-decoration:none" >99%<a/></div>',
        '</div>',
        '<div class="box-foot">',
        '<span class="arrow arrow-up"></span>',
        '<div class="box-foot-left">PLAN<br><span class="box-foot-stats"><strong>{{opened}}</strong></span></div>'.replace(/{{opened}}/, options.data.opened),
        '<span class="arrow arrow-down"></span>',
        '<div class="box-foot-right">REAL<br><span class="box-foot-stats"><strong>706</strong></span></div>',
        '<div >ACC<br><span><strong>710</strong></span></div>',
        '</div>',
        '<P> <div><br><span><strong>Produto B</strong></span></div>',
        '</div>',

        //'<div class="report-statistic-box">',
        //'<div class="box-header">Click-to-open rate (CTOR)</div>',
        //'<div class="box-content click-to-open">',
        ///'<div class="percentage">50%</div>',
       // '</div>',
        //'<div class="box-foot">',
        //'<span class="arrow arrow-up"></span>',
       // '<div class="box-foot-left">Clicked<br><span class="box-foot-stats"><strong>{{clicked}}</strong> (50%)</span></div>'.replace(/{{clicked}}/, options.data.clicked),
        //'<div class="box-foot-right">Non-clicked<br><span class="box-foot-stats"><strong>120</strong> (50%)</span></div>',
       // '</div>',
       // '</div>'
      ].join('');
    }
  }

  function reportCircleGraph() {

    $.fn.percentCircle = function pie(options) {

      var settings = $.extend({
        width: 130,
        trackColor: '#fff',
        barColor: '#fff',
        barWeight: 5,
        startPercent: 0,
        endPercent: 1,
        fps: 60
      }, options);

      this.css({
        width: settings.width,
        height: settings.width
      });

      var _this = this,
        canvasWidth = settings.width,
        canvasHeight = canvasWidth,
        id = $('canvas').length,
        canvasElement = $('<canvas id="' + id + '" width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>'),
        canvas = canvasElement.get(0).getContext('2d'),
        centerX = canvasWidth / 2,
        centerY = canvasHeight / 2,
        radius = settings.width / 2 - settings.barWeight / 2,
        counterClockwise = false,
        fps = 1000 / settings.fps,
        update = 0.01;

      this.angle = settings.startPercent;

      this.drawInnerArc = function(startAngle, percentFilled, color) {
        var drawingArc = true;
        canvas.beginPath();
        canvas.arc(centerX, centerY, radius, (Math.PI / 180) * (startAngle * 360 - 90), (Math.PI / 180) * (percentFilled * 360 - 90), counterClockwise);
        canvas.strokeStyle = color;
        canvas.lineWidth = settings.barWeight - 2;
        canvas.stroke();
        drawingArc = false;
      };

      this.drawOuterArc = function(startAngle, percentFilled, color) {
        var drawingArc = true;
        canvas.beginPath();
        canvas.arc(centerX, centerY, radius, (Math.PI / 180) * (startAngle * 360 - 90), (Math.PI / 180) * (percentFilled * 360 - 90), counterClockwise);
        canvas.strokeStyle = color;
        canvas.lineWidth = settings.barWeight;
        canvas.lineCap = 'round';
        canvas.stroke();
        drawingArc = false;
      };

      this.fillChart = function(stop) {
        var loop = setInterval(function() {
          canvas.clearRect(0, 0, canvasWidth, canvasHeight);

          _this.drawInnerArc(0, 360, settings.trackColor);
          _this.drawOuterArc(settings.startPercent, _this.angle, settings.barColor);

          _this.angle += update;

          if (_this.angle > stop) {
            clearInterval(loop);
          }
        }, fps);
      };

      this.fillChart(settings.endPercent);
      this.append(canvasElement);
      return this;

    };

  }

  function getMockData() {
    return {
      sentTotal: 4120,
    };
  }

}));

(function activateReportOverviewModule($) {
  'use strict';

  var $el = $('.report-overview-module');

  return new ReportOverviewModule({
    element: $el,
    data: {
      date: '2014-12-01',
      sentTotal: 4120,
      delivered: 1462,
      opened: 1449,
    }
  });
}(jQuery));
