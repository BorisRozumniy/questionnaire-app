type Params = {
  url: string,
  setState: (data: any) => void
}

export const getRequest = ({ url, setState }: Params) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setState(data);
    })
    .catch((error) => {
      console.log("error", error);
    })
}
