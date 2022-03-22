
import react from 'react';
import './App.css';
class Panel extends react.Component{
  constructor(props){
    super(props);
    this.breakIncrement= this.breakIncrement.bind(this);
    this.breakDecrement= this.breakDecrement.bind(this);
    this.sessionDecrement= this.sessionDecrement.bind(this);
    this.sessionIncrement= this.sessionIncrement.bind(this);
  }
  breakIncrement(){
    if(this.props.breaklength < 60){
      this.props.botones('break', 'increment')
    }
  }
  breakDecrement(){
    if(this.props.breaklength > 1){
      this.props.botones('break', 'decrement');
    }
  }
  sessionDecrement(){
    if(this.props.sessionlength > 1){
      this.props.botones('session','decrement')
    }
  }
  sessionIncrement(){
    if(this.props.sessionlength < 60){
      this.props.botones('session', 'increment')
    };
  }
  render(){
    
    return(
      <div id="control-panel">
        <div id='break-label'>
          <p>break</p>
          <button id='break-length' className='botonesPanel'>
            <i className='bi bi-arrow-up-circle' id='break-increment' onClick={this.breakIncrement} ></i>
              {this.props.breaklength}
            <i className="bi bi-arrow-down-circle" id='break-decrement' onClick={this.breakDecrement}></i>
          </button>
        </div>
        <div id='session-label'>
          <p>session</p>
          <button id='session-length' className='botonesPanel' >
            <i className='bi bi-arrow-up-circle' id='session-increment' onClick={this.sessionIncrement} ></i>
              {this.props.sessionlength}
            <i className="bi bi-arrow-down-circle" id='session-decrement' onClick={this.sessionDecrement}></i>
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
    console.log()
    return(
      <div  id='timer'>
        <div id='timer-wrapper'>
          <div id='timer-label'>{this.props.type}</div>
          <div id='time-left'>{this.props.format}</div>
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
        <button 
          id='start_stop' 
          onClick={this.props.start}
        >
          <i className="bi bi-play-circle-fill"></i>
        </button>
        <button 
          id='reset'  
          onClick={this.props.reset}
        >
          <i className='bi bi-arrow-repeat'></i>
        </button>
      </div>
    )
  }
}
class App extends react.Component{
  constructor(props){
    super(props);
    this.state = {
      session: 25,
      break: 5,
      timerSecond: 1500,
      type: 'session',
      status: false,
      intervalId:'',
      
    }
    this.formatClock = this.formatClock.bind(this);
    this.resetClock = this.resetClock.bind(this);
    this.countClock = this.countClock.bind(this);
    this.startClock = this.startClock.bind(this);
    this.beepSound = this.beepSound.bind(this);
    this.typelength= this.typelength.bind(this);
  }
  typelength(stadetochange, adjust){
    if(!this.state.status){
      if(adjust === 'increment'){
        this.setState({
          [stadetochange]: this.state[stadetochange] + 1,  
        });
        if(stadetochange === 'session'){
          this.setState({
            timerSecond: this.state[stadetochange] * 60 + 60
          })
        }
      }else if(adjust === 'decrement'){
        this.setState({
          [stadetochange]: this.state[stadetochange] - 1
        });
        if(stadetochange === 'session'){
          this.setState({
            timerSecond: this.state[stadetochange] * 60 - 60
          })
        }
      }

    }
  }
  startClock(){
    if(this.state.status === false){    
 
      this.setState({
        status: true,
        intervalId: setInterval(this.countClock, 1000)
      });
    }else{
      
      this.setState({
        status: false,
        intervalId:clearInterval(this.state.intervalId)
      });
      
    }
  }
  countClock(){
    if(this.state.timerSecond > 0){
      this.setState({
        timerSecond: this.state.timerSecond - 1
      })
    }else if(this.state.timerSecond === 0){

      this.beepSound()
      if(this.state.type === 'session'){
       
        this.setState({
          timerSecond: this.state.break * 60,
          type: 'break'
        });
      }else if(this.state.type === 'break'){
        
        this.setState({
          timerSecond: this.state.session * 60,
          type: 'session'
        });
      }
    }
  }
  resetClock(){
    
    this.setState({
      session: 25,
      break: 5,
      timerSecond: 1500,
      type: 'session',
      status: false,
      intervalId: clearInterval(this.state.intervalId),
    })
    let beep= document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0
    
  }
  formatClock(){
    let minutes= Math.floor(this.state.timerSecond / 60)
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let seconds= this.state.timerSecond % 60;
    seconds= seconds < 10 ? '0' + seconds : seconds; 
    return`${minutes}:${seconds}`
  }
  beepSound(){
    let beep = document.getElementById('beep');
    beep.play();
  }
  render(){
    
    return(
      <div className='App'>
        <header className='App-clock'>
          <div className='clock'>
            <div className='title'>25 + 5 Clock</div>
            <Panel
              breaklength={this.state.break}
              sessionlength={this.state.session}
              botones={this.typelength}
            />
            <Timer
              type={this.state.type}
              format={this.formatClock()}
            />
            <Button
              start={this.startClock}
              reset={this.resetClock}
            />
            <audio 
              id='beep' 
              preload='auto' 
              src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" 
            />
          </div>
        </header>
      </div>
    )
  }
}

export default App;





