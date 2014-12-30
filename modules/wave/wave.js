angular
    .module('app')
    .directive('wave', Wave);

angular.module('app')
    .service('AudioContextSvc', AudioContextSvc);

function AudioContextSvc() {
    this.context = new AudioContext();
};

function Wave(AudioContextSvc) {
    var directive = {
        restrict: 'E',
        templateUrl: '../modules/wave/wave.html',
        scope: {},
        link: link
    }

    return directive;

    function link(scope, elem, attrs) {
        scope.freq = parseFloat(attrs.freq) || parseFloat(attrs.note) || 440;
        scope.volume = parseFloat(attrs.volume) || 0.3;

        scope.noteToggle = true;
        scope.playToggle = false;

        scope.types = [
            'sine',
            'square',
            'saw',
            'triangle'
        ];

        scope.notes = {
            'A4' : 440.00,
            'A#/Bb4' : 466.16,
            'B4' : 493.88
        }

        scope.type = attrs.type || scope.types[0];

        console.log(AudioContextSvc.context);

        var init = function() {

            scope.oscillator = AudioContextSvc.context.createOscillator();
            scope.oscillator.frequency.value = scope.freq;
            scope.oscillator.type = scope.type;
            scope.gainNode = AudioContextSvc.context.createGain();

            scope.oscillator.connect(scope.gainNode);
            scope.gainNode.connect(AudioContextSvc.context.destination);
            scope.gainNode.gain.value = scope.volume;
        };

        scope.startOcs = function() {
            init();
            scope.oscillator.start();
        }

        scope.stopOcs = function() {
            scope.oscillator.stop();
        }

        scope.changeVol = function() {
            scope.gainNode.gain.value = scope.volume;
        }

        scope.updateOcs = function() {
            console.log('changed');
            scope.oscillator.frequency.value = scope.freq;
        }

        scope.updateType = function() {
            console.log('changed');
            scope.oscillator.type = scope.type;
        }
        init();
    }
};