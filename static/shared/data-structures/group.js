var {
    Interface
} = require("@kit-js/interface");
var {
    List
} = require("@shared/data-structures/list.js");
var Group = Interface.define("Group", {
    init( _list = create(List)(),_members = (new Map()) ){

        this._list = _list;this._members = _members;
        return this;

    },
    get size(  ){

        return this._list.length;

    },
    get length(  ){

        return this._list.length;

    },
    get last(  ){

        return this._list.last;

    },
    create(  ){

        "create an empty group instance";
        return create(this)(...arguments);

    },
    of( ...items ){

        "create a new group instance with a variable number\n"+"of arguements,regardless of the number or type of arguements.\n"+"See the native `Array.of` static method.";
        var list = List.from(items);
        return create(this)(list);

    },
    from( items = this.items,fn = ((a) => {

        return a;

    }) ){

        "create a new group instance from an array like, or iterable object.";
        const list=List.from(Array.from(items).map(fn));
        const members=(new Map());
        list.each(((item, node) => {

            return members.set(item, node);

        }));
        return create(this)(list, members);

    },
    pop( _list = this._list,_members = this._members ){

        "remove and return the element last in the groups ordering.";
        return (function(item) {
            /* node_modules/kit/inc/scope.sibilant:12:9 */

            _members.delete(item);
            return item;
        })(_list.pop());

    },
    push( value = this.value ){

        return "Add an element to the end of the groups ordering.";

    },
    each( f = this.f,_list = this._list ){

        "Call the given function on every element of the group, returning the group which is being itterated on";
        _list.each(f);
        return this;

    },
    find( f = this.f,_list = this._list ){

        return _list.find(f);

    },
    add( member = this.member,_list = this._list,_members = this._members ){

        "Add an value to the group, unless the group already has that member.";
        return (function() {
            if (!(_members.has(member))) {
                return (function(node) {
                    /* node_modules/kit/inc/scope.sibilant:12:9 */

                    _members.set(member, node);
                    _list.pushNode(node);
                    return node;
                })(_list.node(member));
            }
        }).call(this);

    },
    has( member = this.member,_members = this._members ){

        "Check if the group has the given member, returning true if yes, and false if no.";
        return _members.has(member);

    },
    remove( member = this.member,_list = this._list,_members = this._members ){

        "Remove a specific member from the group.";
        return (function(node) {
            /* node_modules/kit/inc/scope.sibilant:12:9 */

            (function() {
                if (node) {
                    _list.removeNode(node);
                    return _members.delete(member);
                } else {
                    throw (new Error("Can't remove a member from a group they don't belong to"))
                }
            }).call(this);
            return node;
        })(_members.get(member));

    }
});
exports.Group = Group;
