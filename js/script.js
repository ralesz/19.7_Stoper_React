'use strict';

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0,
                running: false
            }
        }
        // this.running = false;
    }
  
    reset() {
      this.setState({
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      });
    }
    
    print() {
        this.display.innerHTML = this.format(this.times);
    }

    format(times) {
        return `${pad0(times.minutes)} : ${pad0(times.seconds)} : ${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    
    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }
    
    calculate() {
        const times = this.state.times;
        times.miliseconds += 1;
        if (times.miliseconds >= 100) {
          times.seconds += 1;
          times.miliseconds = 0;
        }
        if (times.seconds >= 60) {
          times.minutes += 1;
          times.seconds = 0;
        }
        this.setState({times});
      }
    
    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    resetstoper() {
        this.reset();
        this.print()
      }


    render() {
        return (
            <div className="container">
                <nav>
                    <a href = "#" className = "button" onClick = {() => this.start()}>Start</a>
                    <a href = "#" className = "button" onClick = {() => this.stop()}>Stop</a>
                    <a href = "#" className = "button" onClick = {() => this.reset()}>Reset</a>
                </nav>
                <div className="stopwatch">{this.format(this.state.times)}</div>
            </div>
        );
    }
}

function pad0(value) {
let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
    }

const app = document.getElementById('app')
ReactDOM.render(<Stopwatch />, app);
