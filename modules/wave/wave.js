angular
    .module('app')
    .directive('wave', Wave);

function Wave() {
    var directive = {
        restrict: 'E',
        templateUrl: '/modules/wave/wave.html',
        scope: {},
        link: link
    }

    return directive;

    function link(scope, elem, attrs) {
        scope.freq = parseFloat(attrs.freq) || parseFloat(attrs.note) || 440;
        scope.volume = parseFloat(attrs.volume) || 0.3;

        scope.noteToggle = true;

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

        console.log(scope.type);

        scope.initializeOcs = function() {

            scope.context = new AudioContext();

            scope.oscillator = scope.context.createOscillator();
            scope.oscillator.frequency.value = scope.freq;
            scope.oscillator.type = scope.type;
            scope.gainNode = scope.context.createGain();

            scope.oscillator.connect(scope.gainNode);
            scope.gainNode.connect(scope.context.destination);
            scope.gainNode.gain.value = scope.volume;
        }

        scope.startOcs = function() {

            var num = 1;

            console.log('start osc');
            scope.oscillator.start();
        }

        scope.stopOcs = function() {
            scope.oscillator.stop();
            scope.initializeOcs();
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

        scope.initializeOcs();
    }
};
