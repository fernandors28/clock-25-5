class Panel extends react.Component{
  constructor(props){
    super(props);
    this.sessionIcrement = this.sessionIcrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
  }
  sessionIcrement(){
    this.props.botones('session', 'increment');
  }
  sessionDecrement(){
    if(this.props.session > 1){this.props.botones('session', 'decrement')};
  }
  breakIncrement(){
    this.props.botones('break', 'increment');
  }
  breakDecrement(){
    if(this.props.break > 1){this.props.botones('break', 'decrement')};
  }
  render(){
    //console.log(this.props.session)
    return(
      <div id="control-panel">
        <div id='session-label'>
          <p>session</p>
          <button className='botonesclock' id='session-length'>
            <i className='bi bi-arrow-up-circle' id='session-increment' onClick={this.sessionIcrement} ></i>
              {this.props.session}
            <i className="bi bi-arrow-down-circle" id='session-decrement' onClick={this.sessionDecrement}></i>
          </button>
        </div>
        <div id="break-label">
          <p>break</p>
          <button className='botonesclock' id='break-length'>
            <i className='bi bi-arrow-up-circle'id='break-increment' onClick={this.breakIncrement}></i>
              {this.props.break}
            <i className="bi bi-arrow-down-circle" id='break-decrement' onClick={this.breakDecrement} ></i>
          </button>
        </div>
      </div>
    )
  }  
}

class Timer extends react.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
    <div className='timer'>
      <div className='timer-wrapper'>
        <div id='timer-label' >{this.props.type}</div>
        <div id='time-left'>{this.props.count}</div>
      </div>
    </div>
    )
  }
}



class Button extends react.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
    <div>
      <button id="start_stop" onClick={this.props.start} >
        <i className="bi bi-play-circle-fill"></i>
      </button>
      <button id='reset' onClick={this.props.reset}>
        <i className='bi bi-arrow-repeat'></i>
      </button>
    </div>
    )
  }
}



class App extends react.Component{
  constructor(props){
    super(props);
    this.state={
     
      session: 25,
      break: 5,
      timersSecond: 1500,
      timerMinutes: 1500,
      type: 'session',
      status: false
    }
    this.clockCountDown = this.clockCountDown.bind(this);
    this.clock = this.clock.bind(this);  
    this.start= this.start.bind(this);
    this.resetclock= this.resetclock.bind(this);
    this.botoneslength= this.botoneslength.bind(this);
    this.sound = this.sound.bind(this);
  
  }
  botoneslength(stadetochange, adjust){
    if(!this.state.status){
      if(adjust === 'increment'){
        this.setState({
          [stadetochange]: this.state[stadetochange] + 1,  
        });
        if(stadetochange === 'session'){
          this.setState({
            timerMinutes: this.state[stadetochange] * 60 + 60,
            timersSecond: this.state[stadetochange] * 60 + 60
          })
        }
      }else if(adjust === 'decrement'){
        this.setState({
          [stadetochange]: this.state[stadetochange] - 1
        });
        if(stadetochange === 'session'){
          
          this.setState({
            timerMinutes: this.state[stadetochange] * 60 - 60,
            timersSecond: this.state[stadetochange] * 60 - 60
          })
        }
      }

    }
  }
  resetclock(){
    this.setState({
      session: 25,
      break: 5,
      timersSecond: 1500,
      timerMinutes: 1500,
      type: 'session',
      intervalClock: clearInterval(this.state.intervalClock)

    });
    
  }
  start(){
    if(this.state.status === false){
      this.setState({
        status: true,
        intervalClock: setInterval(this.clockCountDown, 800)
      });
    }else{
      this.setState({
        status: false,
        intervalClock: clearInterval(this.state.intervalClock)
      });
    } 
  }
 
  clockCountDown(){
    if(this.state.timersSecond > 0){
      this.setState({
          timerMinutes: this.state.timerMinutes - 1,
          timersSecond: this.state.timersSecond -1                         
      });

    }else if(this.state.timersSecond === 0){
      this.sound()
      if(this.state.type === 'session'){
        this.setState({
          type: 'break',
         
          timerMinutes: this.state.break * 60,
          timersSecond: this.state.break * 60
        });
      }else if(this.state.type === 'break'){
        this.setState({
          type: 'session',
          
          timerMinutes: this.state.session* 60,
          timersSecond: this.state.session* 60

        })
      }
    }
  }
  clock(){

    let Seconds=  this.state.timersSecond % 60;
    Seconds = Seconds < 10 ? '0' + Seconds : Seconds;
    let Minutes = Math.floor(this.state.timerMinutes  / 60);
    Minutes = Minutes < 10 ? '0' + Minutes : Minutes;
    return `${Minutes}:${Seconds}`;
  }
  sound(){
    let sound = document.getElementById('beep');
    sound.play();
    sound.currentTime = 0;
  }
  render(){
    
    
    return (
      <div className="App">
        <header className="App-clock">
          <div id="margin">
            <div className='title'>25 + 5 Clock</div>
            <Panel
               botones={this.botoneslength}
               session={this.state.session}
               break= {this.state.break}
             />
            <Timer
              count={this.clock()}
              type={this.state.type}
              
            />
            <Button
              start={this.start}
              reset={this.resetclock} 
            />
            <audio id='beep' preload='auto' src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
          </div>
        </header>
      </div>
    );
  }
}