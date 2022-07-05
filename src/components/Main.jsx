import axios from "axios";
import React, { useEffect, useState } from "react";

const url = "https://axios-example-cw.herokuapp.com/api/tutorials";


function Main() {
  const [didupdate, setDidupdate] = useState(false);
  const [state, setState] = useState({
    title: "",
    desc: "",
  });
  console.log(didupdate);
  const [veri, setVeri] = useState([]);

  const [updateVeri, setUpdateVeri] = useState({
    title: "",
    description: "",
  });


  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    setUpdateVeri({ ...updateVeri, [e.target.name]: e.target.value });
  };

  const getAxios = async () => {
    await axios
      .get(url)
      .then((data) => setVeri(data.data))
      .catch((err) => console.log(err));
  };


  const handlePost = async () => {
    await axios({
      method: "post",
      url: url,
      data: {
        title: state.title,
        description: state.desc,
      },
    });
    await setState({
      title: "",
      desc: "",
    });
    await getAxios();
    await setDidupdate(!didupdate);
  };



  const handleDelete = async (Id) => {
    await axios.delete(
      `https://axios-example-cw.herokuapp.com/api/tutorials/${Id}`
    );
    await getAxios();
    await setDidupdate(!didupdate);
  };



  const handlePut = async (id) => {
    await axios.put(
      `https://axios-example-cw.herokuapp.com/api/tutorials/${id}`,
      { title: updateVeri.title, description: updateVeri.description }
    );
    await getAxios();
    await setDidupdate(!didupdate);
  };

  const handleUpdateRouter = (Id) => {
    setUpdateVeri(...veri?.filter((item) => item.id === Id));
  };

  //didmount
  useEffect(() => {
    getAxios();
  }, []);

  //updatemount
  useEffect(() => {
    getAxios();
  }, [didupdate]);

  return (
    <div>
      <h2>Add your Tutarial</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={state.title}
        />
        <input
          type="text"
          name="desc"
          onChange={handleChange}
          value={state.desc}
        />
        <button onClick={handlePost}>Ekle</button>
      </div>
      <div style={{ margin: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Title</th>
              <th>Desc</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {veri?.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleUpdateRouter(item.id)}
                    >
                      +
                    </span>{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(item.id)}
                    >
                      x
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <input
          type="text"
          name="title"
          value={updateVeri.title}
          onChange={handleUpdate}
        />
        <input
          type="text"
          name="description"
          value={updateVeri.description}
          onChange={handleUpdate}
        />
        <button onClick={() => handlePut(updateVeri.id)}>Güncelle</button>
      </div>
    </div>
  );
}

export default Main;
