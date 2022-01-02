import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { editState } from "../atoms/editAtom";

function EditLogin({ name, username, password }) {
  const [edit, setEdit] = useRecoilState(editState);
  const [reveal, setReveal] = useState(false);

  return (
    <div className="flex-col">
      <div className="w-102 bg-gray-300 pt-1 pl-5 h-10">
        <div
          className="button bg-white rounded border-2 h-8 w-14 border-black pl-3"
          onClick={() =>
            setEdit({
              name: name,
              username: username,
              password: password,
            })
          }
        >
          Edit
        </div>
      </div>
      <div className="pl-20 pr-20 pt-3">
        <div className="flex">
          <div className="bg-white">
            <img
              src="./images/keyhole.png"
              className="pl-1 pr-1 pt-1 pb-1 w-16 h-16 rounded border-2 border-black"
            ></img>
          </div>
          <div className="flex-col pl-5">
            <div className="pl-2 w-60 bg-gray-100 hover:border-2 hover:border-blue-200 hover:bg-white focus:bg-white ">
              {name}
            </div>
          </div>
        </div>
        <br></br>
        <div className="bg-white h-36 w-80 flex-col">
          <div className="flex-col pl-5">
            <h3 className="pl-4">username</h3>
            <div className="pl-2 hover:border-2 hover:border-blue-200 hover:bg-white focus:bg-white">
              {username}
            </div>
          </div>
          <br></br>
          <div className="flex-col pl-5">
            <h3 className="pl-4">password</h3>
            <div className="flex">
              <div className="pl-2  hover:border-2 hover:border-blue-200 hover:bg-white focus:bg-white">
                <input
                  type={reveal ? "text" : "password"}
                  disabled={true}
                  value={password}
                ></input>
              </div>
              <div
                className="button w-20 h-6 border-black border-2 bg-blue-200 pl-3"
                onClick={() => setReveal(!reveal)}
              >
                {reveal ? "Conceal" : "Reveal"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditLogin;
