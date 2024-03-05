import { useState, type ChangeEvent } from 'react'
import { customProps } from '../../stores/custom_props.store'
import { useForm } from '@inertiajs/react'

const Imagetab = () => {
  const [props, setProps] = customProps((state) => [state.props, state.setProps])
  const { post, data, setData } = useForm<Array<string>>(props.images)

  function handlChangeImage(e: ChangeEvent<HTMLInputElement>, id: number) {
    const file = e.target.files![0]
    const urlChanging = URL.createObjectURL(file)
    const imagesArray = data
    imagesArray[id] = urlChanging
    setData([...data, urlChanging])
  }
  return (
    <form>
      {props.links.map((link, index) => {
        return (
          <li>
            <label htmlFor="">
              Image for <strong>{link.name}</strong>
              <input type="file" onChange={(e) => handlChangeImage(e, index)} />
            </label>
            {props.images[index] !== '' || data ? (
              <img src={data[index] || props.images[index]} alt="" />
            ) : (
              <span>None</span>
            )}
          </li>
        )
      })}
    </form>
  )
}

export default Imagetab
