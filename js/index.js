function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var API = 'https://fcctop100.herokuapp.com/api/fccusers/top/';

var App = React.createClass({
  displayName: 'App',


  getInitialState: function getInitialState() {
    return {
      data: []
    };
  },

  reQuery: function reQuery(value) {
    var _this = this;

    fetch(API + value).then(function (response) {
      return response.json();
    }).then(function (data) {
      return _this.setState({ data: data });
    });
    //console.log(this.state)
  },

  componentDidMount: function componentDidMount() {
    var _this2 = this;

    console.log("fetch");
    fetch(API + 'recent').then(function (response) {
      return response.json();
    }).then(function (data) {
      return _this2.setState({ data: data });
    });
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(Header, null),
      React.createElement(Table, { data: this.state.data, reQuery: this.reQuery })
    );
  }

});

var Header = React.createClass({
  displayName: 'Header',

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'Camper leaderboard'
      )
    );
  }
});

var Table = React.createClass({
  displayName: 'Table',

  reQuery: function reQuery(value) {
    this.props.reQuery(value);
    console.log(value);

    if (value === "recent") {
      console.log("class");
      $('#alltime').removeClass('sorted true');
      $('#recent').addClass('sorted true');
    } else {
      $('#recent').removeClass('sorted true');
      $('#alltime').addClass('sorted true');
    }
  },

  getUserUrl: function getUserUrl(camper) {
    var username = 'https://www.freecodecamp.com/' + camper.username;
    return username;
  },

  render: function render() {
    var _this3 = this;

    return React.createElement(
      'div',
      { className: 'col-md-12' },
      React.createElement(
        'table',
        { className: 'table table-striped' },
        React.createElement(
          'tr',
          null,
          React.createElement(
            'th',
            { className: 'idcol text-center' },
            '#'
          ),
          React.createElement(
            'th',
            { className: 'text-center' },
            'Camper Name'
          ),
          React.createElement(
            'th',
            _defineProperty({ id: 'defaultsort', className: 'sortable sorted true text-center' }, 'id', 'recent'),
            React.createElement(
              'a',
              { href: '#', onClick: function onClick() {
                  _this3.reQuery('recent');
                } },
              'Past 30 days'
            )
          ),
          React.createElement(
            'th',
            { className: 'sortable text-center', id: 'alltime' },
            React.createElement(
              'a',
              { href: '#', onClick: function onClick() {
                  _this3.reQuery('alltime');
                } },
              'All time points'
            )
          )
        ),
        this.props.data.map(function (camper, i) {
          return React.createElement(
            'tr',
            null,
            React.createElement(
              'td',
              { className: 'text-center' },
              i + 1
            ),
            React.createElement(
              'td',
              null,
              React.createElement('img', { src: camper.img, className: 'userImg' }),
              React.createElement(
                'a',
                { href: _this3.getUserUrl(camper), target: '_blank' },
                camper.username
              )
            ),
            React.createElement(
              'td',
              { className: 'text-center' },
              camper.recent
            ),
            React.createElement(
              'td',
              { className: 'text-center' },
              camper.alltime
            )
          );
        })
      )
    );
  }
});

React.render(React.createElement(App, null), document.getElementById("container"));