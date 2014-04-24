define(function(require,exports,module){
function Paginator(ref, limit) {
    this.ref = ref;
    this.pageNumber = 0;
    this.limit = limit;
    this.lastPageNumber = null;
    this.currentSet = {};
}
module.exports = Paginator;
Paginator.prototype = {
    nextPage: function (callback) {
        if( this.isLastPage() ) {
            callback(this.currentSet);    
        }
        else {
            var lastKey = this.getLastKey(this.currentSet);
            var page = this.pageNumber ? (this.pageNumber*this.limit).toString() :'0';
            // if there is no last key, we need to use undefined as priority
            this.ref.startAt(null,page)
                .limit(this.limit)
                .once('value', this._process.bind(this, {
                    cb: callback,
                    dir: 'next',
                    key: lastKey
                }));
        }
    },

    prevPage: function (callback) {
        if( this.isFirstPage() ) {
            callback(this.currentSet);    
        }
        else {
            var firstKey = this.getFirstKey(this.currentSet);
            var page = this.pageNumber ? (((this.pageNumber-1)*this.limit)-1).toString() :'0';
            // if there is no last key, we need to use undefined as priority
          //  console.log(page);
            this.ref.endAt(null, page)
                .limit(this.limit)
                .once('value', this._process.bind(this, {
                    cb: callback,
                    dir: 'prev',
                    key: firstKey
                }));
        }
    },

    isFirstPage: function () {
        return this.pageNumber == 1;
    },

    isLastPage: function () {
        return this.pageNumber == this.lastPageNumber;
    },
   getLastKey: function(obj) {
    var key;
    if (obj) {
        angular.forEach(obj, function (v, k) {
            key = k;
        });
    }
    return key;
},

 getFirstKey:function(obj) {
    var key;
    if (obj) {
        angular.forEach(obj, function (v, k) {
            key = k;
            return true;
        });
    }
    return key;
},



each:function (obj, cb) {
    if (obj) {
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                var res = cb(obj[k], k);
                if (res === true) {
                    break;
                }
            }
        }
    }
},

size:function (obj) {
    var i = 0;
    angular.forEach(obj, function () {
        i++;
    });
    return i;
},

    _process: function (opts, snap) {
        var vals = snap.val(), len = this.size(vals);
      console.log('_process', opts, len, this.pageNumber, vals);
        if( len < this.limit ) {
            // if the next page returned some results, it becomes the last page
            // otherwise this one is
            this.lastPageNumber = this.pageNumber + (len > 0? 1 : 0);   
        }
        if (len === 0) {
            // we don't know if this is the last page until
            // we try to fetch the next, so if the next is empty
            // then do not advance
            opts.cb(this.currentSet);
        }
        else {
            if (opts.dir === 'next') {
                this.pageNumber++;
               
            } else {
                this.pageNumber--;
                
            }
            this.currentSet = vals;
            opts.cb(vals);
        }

    }
};

});