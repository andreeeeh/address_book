

$(document).ready(function () {
    // Initializes an array to store contact information.
    let contactList = [];
    // Creates variable to capture user input from the form.
    let $form = $("form");
    // Maintain a variable to manage the list of contacts.
    let $contacts = $("#contacts");

    /* Defines event handler function triggered when the "save" button is pressed 
    to add a new contact to the contactList. */
    $form.on("submit", function (e) {
        e.preventDefault();

        let newPerson = {
            name: this.name.value,
            surname: this.surname.value,
            phone: this.phone.value,
            address: this.address.value,
        }

        contactList.push(newPerson);
        this.reset();
        list()
    });

    /* Implements an event handler function that captures the value entered in the search input 
    (to later use in the list function). */
    $("#search").on("input", function () {
        const filter = $(this).val();
        list(filter);
    })

    /* Creates a function that displays the list of contacts in alphabetical order by name and formats them according to specific instructions.
    The function can also filter the contactList by name and surname if a search query is entered in the the search input. */
    function list(filter = "") {
        $contacts.empty();

        contactList.sort((a, b) => a.name.localeCompare(b.name))

        $.each(contactList, function (key, item) {
            if (item &&
                ((item.name && item.name.toLowerCase().includes(filter.toLowerCase())) ||
                    (item.surname && item.surname.toLowerCase().includes(filter.toLowerCase())))) {
                let $contact = $("<li>").appendTo($contacts);
                let $bttn = $("<div>").addClass("editDelete");
                $("<button>").addClass("edit").attr("data-key", key).attr("type", "button").html("Edit").appendTo($bttn);
                $("<button>").addClass("del").attr("data-key", key).attr("type", "button").html("Delete").appendTo($bttn);
                $contact.html(`${item.name} ${item.surname} - <strong>Phone number:</strong> ${item.phone} <strong>Address:</strong> ${item.address}`);
                $contact.append($bttn);
            }
        });
    };

    // Implements an event handler function to remove a contact from the contactList using its "key" reference
    $contacts.on("click", ".del", function () {
        let id = $(this).data("key");
        contactList.splice(id, 1);
        list();
    });

    /* Creates an event handler function to populate the contact information back in the form for editing
     and deletes the current contact from the list. */
    $contacts.on("click", ".edit", function () {
        let id = $(this).data("key");
        $form.find("input[name='name']").val(contactList[id].name);
        $form.find("input[name='surname']").val(contactList[id].surname);
        $form.find("input[name='phone']").val(contactList[id].phone);
        $form.find("input[name='address']").val(contactList[id].address);

        contactList.splice(id, 1);
        list();
    })
});