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
import {
  createProduct,
  getAllProduct,
  removeProduct,
  upadteProduct,
} from "../../services/productService";
import { CloseOutlined } from "@ant-design/icons";
import { formatMoney } from "../../utils/formatData";
import useDebounce from "../../hooks/useDebounce";

export default function ProductManager() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [baseId, setBaseId] = useState(null);
  const [isShowLoadingDelete, setIsShowLoadingDelete] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

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
      render: (_, pro) => <p>{formatMoney(pro.price)}</p>,
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
      render: (_, pro) => (
        <div className="flex gap-2">
          <Button onClick={() => handleEdit(pro)} size="middle">
            Sửa
          </Button>
          <Button
            onClick={() => handleShowModalDelete(pro.id)}
            danger
            type="primary"
            size="middle"
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const data = products.map((pro) => {
    return {
      id: pro.id,
      key: pro.id,
      name: pro.name,
      image: pro.image,
      price: pro.price,
      quantity: pro.quantity,
      categoryId: pro.category.id,
    };
  });

  // Hiển thị modal
  const handleShowModal = () => {
    setIsShowModal(true);
  };

  // Ẩn modal
  const handleCloseModal = () => {
    setIsShowModal(false);

    setBaseId(null);

    form.resetFields();
  };

  const fetchCategories = async () => {
    const response = await getAllCategory();

    setCategories(response.content);
  };

  // Mong muốn khi sử dụng custome hook useDebounce
  const debounceSearch = useDebounce(searchValue, 300);

  const fetchProducts = async () => {
    // Trước khi gọi API hiển thị loading
    setIsLoading(true);

    const response = await getAllProduct(debounceSearch, currentPage, pageSize);

    // Lấy ra mảng product
    setProducts(response.content);

    // Lấy ra tổng số bản ghi
    setTotalElements(response.totalElements);

    // Sau khi đã có dữ liệu thì tắt loading
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [debounceSearch, currentPage, pageSize]);

  const onFinish = async (values) => {
    try {
      if (baseId) {
        // Cập nhật thông tin sản phẩm
        const responseUpdate = await upadteProduct(baseId, values);

        if (responseUpdate.status === 200) {
          // Hiển thị thông báo cập nhật sản phẩm thành công
          message.success("Cập nhật sản phẩm thành công");
        }
      } else {
        // Thêm mới sản phẩm
        const responseCreate = await createProduct(values);
        if (responseCreate.status === 201) {
          // Hiển thị thông báo thêm mới sản phẩm thành công
          message.success("Thêm mới sản phẩm thành công");
        }
      }

      // Load lại dữ liệu
      fetchProducts();

      // Tắt modal
      handleCloseModal();

      // Reset Form
      form.resetFields();
    } catch (error) {
      message.error(error?.response?.data?.name);
    }
  };

  // Mở modal xác nhận xóa
  const handleShowModalDelete = (id) => {
    setIsShowModalDelete(true);

    setBaseId(id);
  };

  // Mở modal xác nhận xóa
  const handleCloseModalDelete = () => {
    setIsShowModalDelete(false);
  };

  // Hàm xác nhận xóa
  const handleConfirmDelete = async () => {
    // Gọi API xóa dữ liệu
    try {
      setIsShowLoadingDelete(true);
      const response = await removeProduct(baseId);

      if (response.status === 200) {
        // Đóng modal xác nhận xóa
        handleCloseModalDelete();

        // Reset lại baseId
        setBaseId(null);
        // Render lại danh sách sản phẩm
        fetchProducts();

        // Thông báo xóa sản phẩm thành công
        message.success("Xóa sản phẩm thành công");

        // Tắt loading
        setIsShowLoadingDelete(false);
      }
    } catch (error) {
      message.error("Xóa sản phẩm thất bại");
      return;
    }
  };

  const handleChangePage = (currentPage, pageSize) => {
    // Cập nhật lại trang hiện tại
    setCurrentPage(currentPage - 1);

    // Cập nhật lại số lượng bản ghi / trang
    setPageSize(pageSize);
  };

  // Hàm mở modal cập nhật
  const handleEdit = (pro) => {
    setIsShowModal(true);

    setBaseId(pro.id);

    // Tìm kiếm và fill giá trị của product vào trong input của Form
    form.setFieldsValue({ ...pro, categoryId: pro.categoryId });
  };

  return (
    <>
      {/* Form thêm mới/cập nhật sản phẩm */}
      <Modal
        footer={false}
        title={`${baseId ? "Update" : "Add"} product`}
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
                {baseId ? "Save" : "Add"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        closeIcon={false}
        footer={
          <div className="flex justify-end gap-2">
            <Button onClick={handleCloseModalDelete}>Hủy</Button>
            <Button
              loading={isShowLoadingDelete}
              onClick={handleConfirmDelete}
              danger
              type="primary"
            >
              Xóa
            </Button>
          </div>
        }
        open={isShowModalDelete}
        title={
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[20px]">Xác nhận</h3>
            <CloseOutlined onClick={handleCloseModalDelete} />
          </div>
        }
      >
        <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
      </Modal>

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[24px] font-semibold">Product</h3>
        <Button onClick={handleShowModal} type="primary">
          Add Product
        </Button>
      </div>

      <div className="flex justify-end mb-3">
        <Input.Search
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-[350px]"
        />
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
          onChange={handleChangePage}
          defaultPageSize={pageSize}
          defaultCurrent={currentPage}
          pageSizeOptions={[5, 10, 20, 50, 100]}
        />
      </div>
    </>
  );
}
