import axios from "axios";
import React, { useEffect, useState } from "react";

const url = "https://axios-example-cw.herokuapp.com/api/tutorials";
function Main() {
  const [state, setState] = useState({
    title: "",
    desc: "",
  });
  const [veri, setVeri] = useState([]);
//   const [updateVeri,setUpdateVeri] = useState({
//     title: "",
//     desc: "",
//   });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

//   const handleUpdate = (e) => {
//     setUpdateVeri([{...updateVeri,[e.target.name] : e.target.value}])
//   }

  const handlePost = () => {
    axios({
      method: "post",
      url: url,
      data: {
        title: state.title,
        description: state.desc,
      },
    });
    setState({
      title: "",
      desc: "",
    });
  };

  const handleDelete = (Id) => {
    console.log(Id);
    axios.delete(`https://axios-example-cw.herokuapp.com/api/tutorials/${Id}`);
  };

//   const handlePut = (Id) => {
//     axios.put(`https://axios-example-cw.herokuapp.com/api/tutorials/${Id}`,{title:"merhaba",description:"dünya"}).then((data) => console.log(data))
//   }

  const getAxios = async() => {
    await axios
    .get(url)
    .then((data) => setVeri(data.data))
    .catch((err) => console.log(err));
  }

//   const handleUpdateRouter = (Id) => {
//     setUpdateVeri(veri?.filter((item) => item.id === Id));
//     console.log(updateVeri);
//   }

  //didmount
  useEffect(() => {
    getAxios();
  }, []);

  //updatemount
  useEffect(() => {
    getAxios();
  },[veri])

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
        <input type="text" name="title" onChange={handleChange} value={state.title}/>
        <input type="text" name="desc" onChange={handleChange} value={state.desc}/>
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
                    <span style={{cursor:"pointer"}} >+</span> <span style={{cursor:"pointer"}} onClick={() => handleDelete(item.id)}>x</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <input type="text" name="title" value={updateVeri[0].title} onChange={handleUpdate}/>
        <input type="text" name="desc" value={updateVeri[0].description} onChange={handleUpdate}/>
        <button onClick={handlePost}>Güncelle</button>
      </div> */}
    </div>
  );
}

export default Main;
