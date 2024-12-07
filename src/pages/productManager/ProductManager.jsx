import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Pagination,
  Select,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { getAllCategory } from "../../services/categoryService";
import { createProduct, getAllProduct } from "../../services/productService";

export default function ProductManager() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, pro) => (
        <Image
          width={50}
          src={pro.image}
          alt={`Image is product ${pro.name}`}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: () => (
        <div className="flex gap-2">
          <Button size="middle">Sửa</Button>
          <Button danger type="primary" size="middle">
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const data = products.map((pro) => {
    return {
      key: pro.id,
      name: pro.name,
      image: pro.image,
      price: pro.price,
      quantity: pro.quantity,
    };
  });

  // Hiển thị modal
  const handleShowModal = () => {
    setIsShowModal(true);
  };

  // Ẩn modal
  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const fetchCategories = async () => {
    const response = await getAllCategory();

    setCategories(response.content);
  };

  const fetchProducts = async () => {
    // Trước khi gọi API hiển thị loading
    setIsLoading(true);

    const response = await getAllProduct();

    // Lấy ra mảng product
    setProducts(response.content);

    // Lấy ra tổng số bản ghi
    setTotalElements(response.totalElements);

    // Sau khi đã có dữ liệu thì tắt loading
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const onFinish = async (values) => {
    try {
      const response = await createProduct(values);

      if (response.status === 201) {
        // Load lại dữ liệu
        fetchProducts();

        // Tắt modal
        handleCloseModal();

        // Reset Form
        form.resetFields();

        // Hiển thị thông báo thêm mới sản phẩm thành công
        message.success("Thêm mới sản phẩm thành công");
      }
    } catch (error) {
      message.error(error?.response?.data?.name);
    }
  };

  return (
    <>
      <Modal
        footer={false}
        title="Add product"
        open={isShowModal}
        // onOk={handleOk}
        onCancel={handleCloseModal}
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Product name"
            name="name"
            rules={[
              {
                required: true,
                message: "Product name is required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[
              {
                required: true,
                message: "Category is required",
              },
            ]}
          >
            {/* Optional chain */}
            <Select
              placeholder="Chooice category"
              options={categories.map((cat) => {
                return {
                  value: cat.id,
                  label: cat.name,
                };
              })}
            />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Image is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Price is required",
              },
            ]}
          >
            <InputNumber className="w-full" />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Quantity is required",
              },
            ]}
          >
            <InputNumber className="w-full" />
          </Form.Item>

          <Form.Item label={null}>
            <div className="flex justify-end gap-2">
              <Button
                onClick={handleCloseModal}
                type="default"
                htmlType="button"
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[24px] font-semibold">Product</h3>
        <Button onClick={handleShowModal} type="primary">
          Add Product
        </Button>
      </div>

      <div className="flex justify-end mb-3">
        <Input.Search className="w-[350px]" />
      </div>

      <div className="mb-3">
        <Table
          loading={isLoading}
          pagination={false}
          columns={columns}
          dataSource={data}
        />
      </div>
      <div className="flex justify-end">
        <Pagination
          showSizeChanger
          total={totalElements}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          defaultPageSize={20}
          defaultCurrent={1}
        />
      </div>
    </>
  );
}
