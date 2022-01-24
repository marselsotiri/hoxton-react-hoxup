
function Search({ setSearch }) {
   
    return <form className="aside__search-container"
        onSubmit={(e) => {
            e.preventDefault();
        }}
    >
        <input
            type="search"
            name="messagesSearch"
            placeholder="Search chats"
            onChange={(e) => {
                setSearch(e.target.value);
            }}
        />
    </form>
}
export default Search