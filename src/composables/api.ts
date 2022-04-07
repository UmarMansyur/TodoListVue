export default function useApi() {
  const host = 'http://localhost:8181';
  async function getResource(path: string): Promise <any> {
    return new Promise (async(resolve, reject) => {
      try {
        const response = await fetch (host+ path, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        resolve(response.json());
      } 
      catch (error) {
        reject(error)  
      }
    })
  }

  async function postResource(path: string, data: any): Promise <any> {
    return new Promise (async(resolve, reject) => {
      try {
        const response = await fetch (host+ path, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        resolve(response.json());
      } 
      catch (error) {
        reject(error)  
      }
    })
  }
  async function putResource(path: string, data: any): Promise <any> {
    return new Promise (async(resolve, reject) => {
      try {
        const response = await fetch (host+ path, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        resolve(response.json());
      } 
      catch (error) {
        reject(error)  
      }
    })
  }
  async function deleteResource(path: string): Promise <any> {
    return new Promise (async(resolve, reject) => {
      try {
        const response = await fetch (host+ path, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        resolve(response.json());
      } 
      catch (error) {
        reject(error)  
      }
    })
  }
  return {
    getResource, postResource, putResource, deleteResource
  }
}

