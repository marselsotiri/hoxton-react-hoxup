function CreateUserModal({ setModal, users, setUsers }) {
    function createUser(e) {
        e.preventDefault();
        const formEl = e.target;
        const newUserData = {
            firstName: formEl.firstName.value,
            lastName: formEl.lastName.value,
            phoneNumber: formEl.phoneNumber.value,
            avatar: `https://avatars.dicebear.com/api/avataaars/${formEl.firstName.value}${formEl.lastName.value}.svg`
        };
        fetch("http://localhost:4000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUserData)
        })
            .then((resp) => resp.json())
            .then((user) => {
                const updatedUsers = [...users, user];
                setUsers(updatedUsers);
                setModal('');
            });
    }
    return (
        <div className="modal-wrapper">

            <form className="modal" onSubmit={createUser}>

                <h2 className="modal-title">Enter your details</h2>
                <button className='close-modal' onClick={() => setModal('')}>
                    X
                </button>
                <label htmlFor="firstName">
                    <h3>First name</h3>
                </label>
                <input required type="text" name="firstName" id="firstName" />

                <label htmlFor="lastName">
                    <h3>Last name</h3>
                </label>
                <input required type="text" name="lastName" id="lastName" />

                <label htmlFor="phoneNumber">
                    <h3>Phone number</h3>
                </label>
                <input required type="text" name="phoneNumber" id="phoneNumber" />

                <button className="create-user">CREATE USER</button>
            </form>
        </div>
    );
}

export default CreateUserModal;