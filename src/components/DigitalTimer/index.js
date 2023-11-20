// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {number: 25, Start: false, TimeInsecond: 0}

  componentWillUnmount = () => {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  incrementTimeElapsedInSeconds = () => {
    const {number, TimeInsecond} = this.state
    const isTimerCompleted = number * 60 === TimeInsecond
    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({Start: false})
    } else {
      this.setState(prev => ({TimeInsecond: prev.TimeInsecond + 1}))
    }
  }

  ResetButton = () => {
    this.clearTimeInterval()
    this.setState({number: 25, Start: false, TimeInsecond: 0})
  }

  minus = () => {
    const {number, Start} = this.state
    if (number > 1) {
      this.setState(prev => ({number: prev.number - 1}))
    }
  }

  add = () => {
    this.setState(prev => ({number: prev.number + 1}))
  }

  ChangeButton = () => {
    const {number, Start, TimeInsecond} = this.state
    const isTimerCompleted = number * 60 === TimeInsecond

    if (isTimerCompleted) {
      this.setState({TimeInsecond: 0})
    }
    if (Start) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prev => ({Start: !prev.Start}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {number, TimeInsecond} = this.state
    const TimeMultiply = number * 60 - TimeInsecond
    const minutes = Math.floor(TimeMultiply / 60)
    const Seconds = Math.floor(TimeMultiply % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = Seconds > 9 ? Seconds : `0${Seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {number, Start, TimeInsecond} = this.state
    const imageUrl = Start
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const text = Start ? 'Pause' : 'Start'
    const text2 = Start ? 'Running' : 'Paused'
    const disableText = TimeInsecond > 0
    const alternate = Start ? 'pause icon' : 'play icon'

    return (
      <div className="main-container">
        <h1 className="heading"> Digital Timer</h1>
        <div className="second-container">
          <div className="image-container">
            <h1 className="para">{this.getElapsedSecondsInTimeFormat()} </h1>
            <p>{text2}</p>
          </div>
          <div className="start">
            <div className="image">
              <button className="pause-button">
                <img
                  src={imageUrl}
                  className="start-image"
                  onClick={this.ChangeButton}
                  alt={alternate}
                />

                {text}
              </button>
              <button className="pause-button" onClick={this.ResetButton}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  className="start-image"
                  alt="reset icon"
                />
                Reset
              </button>
            </div>
            <p className="setTimer">Set Timer limit</p>
            <div className="setTimerDiv">
              <button
                type="button"
                className="button"
                onClick={this.minus}
                disabled={disableText}
              >
                -
              </button>
              <p className="SetTimerPara">{number}</p>
              <button
                type="button"
                className="button"
                onClick={this.add}
                disabled={disableText}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
