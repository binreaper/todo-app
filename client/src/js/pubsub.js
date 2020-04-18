function PubSub() { };


PubSub.prototype = {
  channels: [],
  publish(channelName, payload) {
    const matchingChannel = this._findChannel(channelName);
    if (matchingChannel) {
      matchingChannel.listeners.forEach(listenerCallback => {
        listenerCallback(payload);
      })
    }
  },
  subscribe(channelName, cb) {
    let matchingChannel = this._findChannel(channelName);
    if (!matchingChannel) {
      this._addChannel(channelName);
      matchingChannel = this._findChannel(channelName);
    }
    matchingChannel.listeners.push(cb);
  },
  _findChannel(name) {
    return this.channels.find(item => item.name === name);
  },
  _addChannel(name) {
    this.channels.push({
      name: name,
      listeners: []
    });
  }
};


export default PubSub;
