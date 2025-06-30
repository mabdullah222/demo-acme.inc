'use client'
import { Modal, Button, Upload, message, UploadProps } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"

type ModalPropsType = {
  open: boolean
  productId: string
  name: string
  unitPrice: string
  imageUrl: string
  toggleOpen: () => void
  mutationFn: any
  title: string
}

type formDataStateType = {
  name: string
  unitPrice: string
  file: File | string | null
  fileList: any[]
}

const ModalComponent = ({
  open,
  productId,
  name,
  unitPrice,
  imageUrl,
  toggleOpen,
  mutationFn,
  title,
}: ModalPropsType) => {
  const [formData, setFormData] = useState<formDataStateType>({
    name,
    unitPrice,
    file: null,
    fileList: [],
  })

  const { mutate,isPending,isError,isSuccess } = mutationFn()

  useEffect(() => {
    if (isSuccess) {
      message.success("Product updated successfully")
      toggleOpen()
    }
  }, [isSuccess])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange: UploadProps['onChange'] = ({ file, fileList }) => {
    setFormData((prev) => ({
      ...prev,
      file: fileList[0]?.originFileObj || null,
      fileList,
    }))
  }

  const handleRemove = () => {
    setFormData((prev) => ({
      ...prev,
      file: null,
      fileList: [],
    }))
  }

  const handleOk = () => {
    if (!formData.name.trim()) {
      message.error("Name cannot be empty")
      return
    }

    const price = parseFloat(formData.unitPrice)
    if (isNaN(price) || price <= 0) {
      message.error("Unit Price must be a positive number")
      return
    }
    const payload = new FormData()
    payload.append("productId", productId)
    payload.append("name", formData.name)
    payload.append("unitPrice", formData.unitPrice)

    if (!formData.file && title.split(' ')[0]=='Update') {
        payload.append("image", imageUrl)
        mutate(payload)
        return
    }

    if (!formData.file){
      message.error("Please select an image file")
      return
    }

    payload.append("image", formData.file)
    mutate(payload)
  }

  return (
    <Modal
      open={open || isPending || isError}
      title={title}
      onOk={handleOk}
      onCancel={toggleOpen}
      footer={[
        <Button key="back" onClick={toggleOpen}>
          Back
        </Button>,
        <Button key="submit" type="primary" loading={isPending} onClick={handleOk}>
          {title.split(' ')[0]}
        </Button>
      ]}
    >
      <form className="flex flex-col space-y-3">
        <div className="flex flex-col space-y-2">
          <label className="font-extrabold text-neutral-700" htmlFor="name">
            Name
          </label>
          <input
            value={formData.name}
            onChange={handleInputChange}
            className="outline outline-zinc-500 p-1.5 rounded-md"
            type="text"
            name="name"
            placeholder="Name of Product"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-extrabold text-neutral-700" htmlFor="unitPrice">
            Unit Price
          </label>
          <input
            value={formData.unitPrice}
            onChange={handleInputChange}
            className="outline outline-zinc-500 p-1.5 rounded-md"
            type="text"
            name="unitPrice"
            placeholder="Price of Product"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-extrabold text-neutral-700" htmlFor="file">
            Image
          </label>
          <Upload
            beforeUpload={() => false}
            fileList={formData.fileList}
            onChange={handleImageChange}
            onRemove={handleRemove}
            accept="image/*"
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
        </div>
      </form>
    </Modal>
  )
}

export default ModalComponent
