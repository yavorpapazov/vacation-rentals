import { useState } from "react"

function Bnb({bnbTitle, bnbImage, id, onDelete, onUpdate, onChange, newTitle}) {
  let [showUpdateBtn, setShowUpdateBtn] = useState(false)
  function handleUpdateBtn() {
    setShowUpdateBtn(prevState => !prevState)
  }
  let update = (
    <div>
      <div >
        <label htmlFor="newtitle">New title</label>
        <br />
        <input id="newtitle" type="text" value={newTitle} onChange={onChange}></input>
      </div>
      <div>
        <button onClick={() => onUpdate(id)}>Update</button>
      </div>
    </div>
  )
  return (
    <div>
      <h3>{bnbTitle}</h3>
      <div>
        <img src={bnbImage} alt="title" />
      </div>
      <div>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
      {showUpdateBtn && update}
      <div>
        <button onClick={handleUpdateBtn}>{showUpdateBtn ? "Hide Update" : "Update"}</button>
      </div>
    </div>
  )
}

export default Bnb