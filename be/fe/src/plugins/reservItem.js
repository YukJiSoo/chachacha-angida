export default class reservItem {
  constructor(reserv_time, arrival_time, menu_list, status, store_name, total_price){
    this.reserv_time = reserv_time
    //this.reserv_time(rt)
    this.arrival_time = menu_list
    this.status = status
    this.store_name = store_name
    this.total_price = total_price
    this.times = [
      { id: 0, time: 1 },
      { id: 1, time: 1 },
    ]
    this.progress = 100
    // isActive: false,
    this.timeinterval = undefined
    var oldDateObj = new Date(reserv_time)
    this.endTime = new Date()
    this.endTime.setTime(oldDateObj.getTime() + 10 * 60 * 1000)
  }
  set reserv_time (rt) { reserv_time = rt}
  get reserv_time () {    return reserv_time;   }
  get arrival_time () {    return this.arrival_time;   }
  get status () {    return this.status;   }
  get store_name () {    return this.store_name;   }
  get total_price () {    return this.total_price;   }
  get times () {
    let tempTimeStr = '';
    if(times[0].time < 10)
      tempTimeStr += '0' + times[0].time
    else {
      tempTimeStr = times[0].time
    }
    tempTimeStr += ':'
    if(times[1].time < 10)
      tempTimeStr += '0' + times[1].time
    else {
      tempTimeStr = times[1].time
    }
    return tempTimeStr
  }
  get progress () {    return this.progress;   }

  updateTimer() {
    if (
      this.times[1].time > 0 ||
      this.times[0].time > 0
    ) {
      this.getTimeRemaining();
    } else {
      clearTimeout(this.timeinterval);
      // this.times[3].time = this.times[2].time = this.times[1].time = this.times[0].time = 0;
       this.progress = 0;

    }
  }
  getTimeRemaining() {
    let t = Date.parse(new Date(this.endTime)) - Date.parse(new Date());
    if(t >= 0){
      this.times[1].time = Math.floor(t / 1000 % 60); //seconds
      this.times[0].time = Math.floor(t / 1000 / 60 % 60); //minutes
      if(this.times[0].time<10)
        this.times[0].time = '0' + this.times[0].time
      if(this.times[1].time<10)
        this.times[1].time = '0' + this.times[1].time
    }else {
      this.times[1].time = this.times[0].time  = 0;
      this.progress = 0;
    }
  }
}
