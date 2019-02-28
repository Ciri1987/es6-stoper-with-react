class Stopwatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            watch: null
        }
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        })
    }

    setZero() {
        this.stop();
        this.reset();
        this.print();
    }

    format() {
        return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.setState({ running: true });
            this.state.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate() {
        let times = JSON.parse(JSON.stringify(this.state.times))

        times.miliseconds += 1;
        if (times.miliseconds >= 100) {
            times.seconds += 1;
            times.miliseconds = 0;
        }
        if (times.seconds >= 60) {
            times.minutes += 1;
            times.seconds = 0;
        }
        this.setState({ times: times })
    }

    stop() {
        this.setState({ running: false });
        clearInterval(this.state.watch);
    }

    render() {
        return (
            < div className='stopwatch-module'>
                < div className='timer text-light'>
                    < h1>Stopwatch</h1>
                </div>
                < nav className='controls'>
                    < a href="#" onClick={() => { this.start() }} className='button btn btn-dark' id='start'>Start</a>
                    < a href="#" onClick={() => { this.stop() }} className='button btn btn-dark' id='stop'>Stop</a>
                    < a href="#" onClick={() => { this.reset() }} className='button btn btn-danger' id='reset'>Reset</a>
                </nav>
                < div className='stopwatch bg-light'>{this.format()}</div>
                < ul className='results'></ul>
            </div >
        )
    }
}

const pad0 = value => {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(<Stopwatch />, document.getElementById('app'));
