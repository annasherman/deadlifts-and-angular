$(document).ready(function() {



Sortable.create(workoutList, {
    group: "workoutList",
    dataIdAttr: true,
    store: {
        /**
         * Get the order of elements. Called once during initialization.
         * @param   {Sortable}  sortable
         * @returns {Array}
         */
        get: function (sortable) {
            var order = localStorage.getItem('retainSort') || localStorage.getItem(sortable.options.group);
            console.log('get');
            return order ? order.split('|') : [];
        },

        /**
         * Save the order of elements. Called onEnd (when the item is dropped).
         * @param {Sortable}  sortable
         */
        set: function (sortable) {
            var order = sortable.toArray();
            console.log('set');
            console.log(order);
            localStorage.setItem('retainSort', order.join('|')),
            localStorage.setItem(sortable.options.group, order.join('|'));
        }
    }
});

var my_srt_list = document.getElementById("workoutList"); // ul
var my_srt_items;//li
var ids; // li [data-sortable-id]

// Get the sorted NodeList (array) of items
function getOrder() {
    my_srt_items = document.querySelector("#workoutList");
    console.log(my_srt_items);
    // ids = [].map.call(my_srt_items, function (el) {
    //                     return el.dataset.sortableId; // [data-sortable-id]
    //                 });
    console.log("IDs: " + ids);
}
getOrder();
// Refresh the order everytime the item is dragged & dropped
// my_srt_list.addEventListener("dragend", getOrder, false);


 });
