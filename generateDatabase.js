var async = require('async');

module.exports = function(r, async) {
  //A nicely formatted waterfall function in async.
  async.waterfall([
    function(finished) {
      r.dbList().contains('dementiahack')
        .run()
        .then(function(result) {
    		finished(null, result)
        })
        .error(function(err) {
          finished(err);
        })
    },
    function(dbExists, finished) {
      if (dbExists == false) {
        r.dbCreate('dementiahack')
          .run()
          .then(function() {
            finished(null);
          })
          .error(function(err) {
            finished(err);
          });
      } else {
        finished(null);
      }
    },
    function(finished) {
      r.db('dementiahack').tableList().contains('schedule')
        .run()
        .then(function(result) {
          finished(null,result);
        })
        .error(function(err) {
          finished(err);
        });
    },
    function(tableExists, finished) {
      if (tableExists == false) {
        r.db('dementiahack').tableCreate('schedule')
          .run()
          .then(function(result) {
            finished(null, false);
          })
          .error(function(err) {
            finished(err);
          })
      } else {
        finished(null, true);
      }
    },
    function(tableIndexed, finished) {
      if (tableIndexed == false) {
        r.db('dementiahack').table('schedule')
        .indexCreate('date')
          .run()
        	.then(function(result) {
      	    finished(null);
  		    })
          .error(function(err) {
            finished(err);
          })
      } else {
        finished(null);
      }
    }
  ], function(err) {
    if (err) throw err;
  });
}
