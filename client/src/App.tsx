import React from 'react';
import { useTypedSelector } from './store/selector';
import { useDispatch } from 'react-redux';
import { types } from './store/actions/types';
import axios from 'axios';

const testFile = [
  {
    "type": "overlay",
    "image": "test.jpg",
    "time": "1,3",
    "position": {"x": 200, "y": 200}
  },
  {
    "type": "drawtext",
    "text": "THIS IS TEXT",
    "time": "1,7",
    "position": {"x": 0, "y": 0},
    "fontsize": 20,
    "fontcolor": "yellow",
    "fontfile": "Robot-Regular.ttf"
  },
  {
    "type": "overlay",
    "image": "test.jpg",
    "time": "2,5",
    "position": {"x": 300, "y": 100}
  },
  {
    "type": "overlay",
    "image": "test.jpg",
    "time": "3,4",
    "position": {"x": 0, "y": 0}
  },
]

function dataURLtoFile(dataurl: any, filename: any) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
  }

function App() {
  const dispatch = useDispatch();
  const text = useTypedSelector(state => state.test);
  const base64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAH0AfQDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD910hIYsT047e3I69zjrnrXQdBNHaMZPOPYFVOCDtbHXnB5HBAHHYckgC3Fo0iheQCwYMOpZMAEA+nGcggkA+tJpNWYtForXtt5bbduhLHaBRzwCB7ngfp1pj32F+z5BAyVDYJYEcnjjHUY7j0PocJKysNtttvdu79WU57OR2HltnDDcCB8y9CMnp657fjQ1dNdxCyQY2qexIye/45Iz9OnTnimAyOwjiyUDDd7k9OgOemM/iOc88AEwgwehJHpk+/OD3HpigBxtwpPByx5wc9R09B0zn68+iStfzbf3gKtpjkjPTGTjn8D+P+eBq7T7X/ABAtCykwODljggYOSemccjv6Dnn0pgWmtJYlBbaOCeGyQMDPGMZHfkeozxQBRa2yxbOSe3+ce9Tyrq3vfpq38vy7jTaaae1vwd7el9bd9R3lhk2s393HGMYB6n3ByOo49sVMPdco66uUr2sraK1/8ugSd5N6au+miu9WkvL7uzY2O2lwPlLAngqh556AD8uvpWgjQ8lozGzK2VPKgcjpg985Hzdh2yMg0rap9r/iHfzd35tKyb80tPQkbfM+5vkU8h2HYdPlA5DABSQDyOCBnByXvo9bXt5AWFtHPRgFOSDtLZU4OAMg8EDOcew65Tgm76/18g9f6/Mja1kkxGMnBJYsCuMkjcOAcZLHB6+4FTCO9+ZWm7J/LbTZ/K5cqknBRaVopa2vK0VZK+r+S+W7Fk0+bYsQMZQMXDEsCruFVsjHIIVQOvuAck3yr8eb5k3fltbZbfdv57+ZmzWLKDubkHkAHOfyxj9CSPXkavbyaf3C/r79ysbd9pIXIBAJ5z6KdvH4noO9MDn9VtZmjO3nAc7QTuPQgKADnkdMZOOM5xS5Ve+uv9b7r5MuFR022knfvfz7Ndz588V28qb94MqsC7cbWiC4UZAA6BcE9sE7epp8iblVaak1H00XL56pdmKc5Tk5St02vva2zvbRLrvfRdfyo/bs0iTWpfBGmKgk36BfXjJ5qxuRa+J9PUbHx8yoJHaRE8yVkZggXaJYsJtxqQlZe9y09d9Zb6PsrrfpdItUZew9vePL7V0uVNufMoc6layXLy2Td7p6WaVzzf8AYssZ4fjyrRNtmntL+4ZmAYNMsE9vOMEKqhkuSFXgkbtmHAZLqQcoOzXNry81rc3K1HnSV+RytflV7vTTQyTs7rdao/pCGnldqbSW2oxxuP3lVsAYyQdwIYZDZBUlSDWWG9ooTVXkUo1JK8OZRaSirrn11le1+lutwu223a7benm3b8N/Mty2DwJuzhtwwAVIOMZ655OMY9OQR1HSAiK+3bjLHOAOc/l39M/yoAIoHWRTkqy4ZSRjbgk5OQQeR6H8KTV013A2ILFI2DklgAu0AEBWGOQckszn8T+X5I6qcYuEW4pvXdJ/afc//Z';

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: types.SET_TEST_VALUE,
      payload: {text: e.target.value}
    })
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = dataURLtoFile(base64, 'test.jpg');
    const imageFile2 = dataURLtoFile(base64, 'test2.jpg');
    const imageFile3 = dataURLtoFile(base64, 'test3.jpg');
    const formData = new FormData();
    const videoFile: any = e.target.files;
    formData.append('video', videoFile[0]);
    formData.append('images', imageFile)
    formData.append('images', imageFile2)
    formData.append('images', imageFile3)
    formData.append('videoEditor', JSON.stringify(testFile));
    
    try {
      const result = await axios({
        url: 'upload-video',
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(result);
    } catch (err) {
      throw err;
    }
  }

  return (
    <div className="App">
      <input onChange={handleInput}></input>
      <input onChange={handleFile} type="file" accept="video/mp4"></input>
      <canvas />
    </div>
  );
}

export default App;
