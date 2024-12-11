import { Button, Form, Input, Modal, Pagination, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  fetchAllCategory,
} from "../../redux/slices/categorySlice";

export default function CategoryManager() {
  // Lấy giá trị từ store trong redux
  const { data, error, status } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, []);

  const columns = [
    {
      title: "Category name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          {record.status ? (
            <Tag color="green">Active</Tag>
          ) : (
            <Tag color="red">Inactive</Tag>
          )}
        </>
      ),
    },
    {
      title: "Option",
      key: "status",
      render: () => (
        <div>
          <Button>Sửa</Button>
          <Button>Xóa</Button>
        </div>
      ),
    },
  ];

  // ?. -> đây là cú pháp optional chain (kiểm tra khi data khác null hoặc undefined thì nó mới cho phép truy cập vào content)

  // Đổ dữ liệu từ API vào trong bảng
  const dataSources = data?.map((item) => {
    return {
      key: item.id,
      name: item.name,
      status: item.status,
    };
  });

  const handleShowModal = () => {
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  // Submit form
  const onFinish = (values) => {
    //  Bắn dispatch một action (chính là dữ liệu lấy từ form) vào trong store để xử lý
    dispatch(createCategory(values));
  };

  return (
    <>
      <Modal
        footer={false}
        title={`Add Category`}
        open={isShowModal}
        onCancel={handleCloseModal}
      >
        <Form
          // form={form}
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Category name"
            name="categoryName"
            rules={[
              {
                required: true,
                message: "Category name is required",
              },
            ]}
          >
            <Input />
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
                Add
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[24px] font-semibold">Category</h3>
        <Button onClick={handleShowModal} type="primary">
          Add Category
        </Button>
      </div>

      <div className="flex justify-end mb-3">
        <Input.Search className="w-[350px]" />
      </div>

      <div className="mb-3">
        <Table
          loading={status === "pending"}
          pagination={false}
          columns={columns}
          dataSource={dataSources}
        />
      </div>
      <div className="flex justify-end">
        <Pagination
          showSizeChanger
          total={85}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          // onChange={handleChangePage}
          // defaultPageSize={pageSize}
          // defaultCurrent={currentPage}
          pageSizeOptions={[5, 10, 20, 50, 100]}
        />
      </div>
    </>
  );
}
