import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

// Hiệu ứng cho card/blog
const BlogCard = styled.div`
  border-radius: 1.25rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  background: #fff;
  &:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 8px 32px rgba(0,0,0,0.16);
    z-index: 2;
  }
`;

const BlogTitle = styled.h2`
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(90deg, #2563eb, #38b6ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 8px rgba(56,182,255,0.08);
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;
  text-shadow: 1px 1px 6px rgba(37,99,235,0.08);
`;

const ParentDashboard = () => {
  {
    /**Bắt đầu sử lí logic để nạp API */
  }
  const [blogs, setBlogs] = useState([]); //state để lưu danh sách blog
  const [loading, setLoading] = useState(true); //state để hiển thị trạng thái loading
  const [error, setError] = useState(null); //state để lưu lỗi nếu có

  // Gọi API khi component được mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwiZW1haWwiOiJwYXJlbnRAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUGFyZW50IiwiZXhwIjoxNzQ5MDM4OTI3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxODIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxODIifQ.bPbFgD4y0GGSlryFzZj7YYYzlkWFL9pDbg6uHdZGz4U";
        const response = await axios.get(
          "http://localhost:5182/api/BlogPosts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBlogs(response.data); //lưu dữ liệu của blog vào state
        setLoading(false); // tắt trạng thái loading
      } catch (err) {
        console.error("API error:", err.response ? err.response : err); // Log chi tiết lỗi
        setError(
          err.response
            ? `Lỗi ${err.response.status}: ${err.response.data.message || "Không thể tải dữ liệu blog."
            }`
            : "Không thể kết nối đến server."
        );
      }
    };
    fetchBlogs();
  }, []); //dependancy array rỗng, chỉ chạy 1 lần khi component mount
  {
    /**Kết thúc sử lí logic để nạp API */
  }

  //Bắt đầu hàm format ngày
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  //Kết thúc hàm format ngày

  return (
    <div className="background-page" style={{ position: 'relative', overflow: 'hidden' }}>
      <div id="starfield-parallax">
        <div className="stars stars1"></div>
        <div className="stars stars2"></div>
        <div className="stars stars3"></div>
      </div>
      <div className="container" style={{ maxWidth: 2400, margin: "0 auto", position: 'relative', zIndex: 2}}>
        {/* Mở đầu Banner Section */}
        <section className="banner position-relative">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-lg-6">
                <div className="banner-content text-white">
                  <h1 className="display-4 fw-bold mb-4">
                    Chăm sóc sức khỏe học đường
                  </h1>
                  <p className="lead mb-4">
                    Đồng hành cùng phụ huynh trong việc chăm sóc sức khỏe cho học
                    sinh
                  </p>
                  <Link to="/parent/more-know" className="btn btn-primary btn-lg">
                    Tìm hiểu thêm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Kết thúc Banner Section */}

        {/* Mở đầu School Information Section */}
        <section className="school-intro-bg py-5 bg-light" style={{ marginTop: "0.5cm" }}>
          <div className="container">
            <SectionTitle>Giới thiệu về trường học</SectionTitle>
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="School Building"
                  className="img-fluid rounded shadow"
                />
              </div>
              <div className="col-lg-6">
                <p className="lead mb-4">
                  Trường chúng tôi tự hào là một trong những cơ sở giáo dục hàng
                  đầu với hệ thống y tế học đường hiện đại và chuyên nghiệp.
                </p>
                <p className="mb-4">
                  Với đội ngũ nhân viên y tế giàu kinh nghiệm, chúng tôi cam kết
                  mang đến dịch vụ chăm sóc sức khỏe tốt nhất cho học sinh.
                </p>
                <p>
                  Phòng y tế được trang bị đầy đủ thiết bị y tế cần thiết và luôn
                  sẵn sàng hỗ trợ học sinh trong mọi tình huống.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Kết thúc School Information Section */}

        {/* Mở đầu Health Blog Section */}
        <section className="py-5">
          <div className="container">
            <BlogTitle>Blog sức khỏe học đường</BlogTitle>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 180 }}>
                <Spinner animation="border" variant="primary" style={{ width: 60, height: 60 }} />
              </div>
            ) : error ? (
              <p className="text-center text-danger">{error}</p>
            ) : (
              <div className="row g-4">
                {blogs.map((blog) => (
                  <div className="col-md-4" key={blog.id}>
                    <BlogCard className="card h-100">
                      <img
                        src={blog.imageUrl}
                        className="card-img-top"
                        alt={blog.title}
                        style={{
                          width: "100%",
                          height: 180,
                          objectFit: "cover",
                          borderTopLeftRadius: "1.25rem",
                          borderTopRightRadius: "1.25rem",
                        }}
                        onError={(e) => {
                          e.target.onError = null;
                          e.target.src =
                            "https://placehold.jp/800x180.png?text=No+Image";
                        }}
                      />
                      <div className="card-body">
                        <small className="text-muted">
                          {formatDate(blog.createdAt)}
                        </small>
                        <h5 className="card-title mt-2 fw-bold" style={{ color: '#2563eb' }}>{blog.title}</h5>
                        <p className="card-text">
                          {blog.contentSummary.length > 100
                            ? blog.contentSummary.substring(0, 100) + "..."
                            : blog.contentSummary}
                        </p>
                        <Link
                          to={`/parent/blog/${blog.id}`}
                          className="btn btn-link text-primary p-0"
                        >
                          Đọc thêm →
                        </Link>
                      </div>
                    </BlogCard>
                  </div>
                ))}
              </div>
            )}
            {/** */}

            {false && ( // cái false ở đây để tắt đoạn code dưới này làm nó ko chạy được
              <div className="row g-4">
                {/* Mở đầu Blog Post 1 */}
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      className="card-img-top"
                      alt="Phòng tránh cúm"
                      style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        borderTopLeftRadius: "0.75rem",
                        borderTopRightRadius: "0.75rem",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/800x180?text=No+Image";
                      }}
                    />
                    <div className="card-body">
                      <small className="text-muted">15/03/2024</small>
                      <h5 className="card-title mt-2">
                        Cách phòng tránh bệnh cúm mùa cho học sinh
                      </h5>
                      <p className="card-text">
                        Những biện pháp phòng tránh bệnh cúm mùa hiệu quả cho học
                        sinh trong môi trường học đường...
                      </p>
                      <Link
                        to="/parent/blog/1"
                        className="btn btn-link text-primary p-0"
                      >
                        Đọc thêm →
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Kết thúc Blog Post 1 */}

                {/* Mở đầu Blog Post 2 */}
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      className="card-img-top"
                      alt="Dinh dưỡng học đường"
                      style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        borderTopLeftRadius: "0.75rem",
                        borderTopRightRadius: "0.75rem",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/800x180?text=No+Image";
                      }}
                    />
                    <div className="card-body">
                      <small className="text-muted">10/03/2024</small>
                      <h5 className="card-title mt-2">
                        Dinh dưỡng học đường: Xây dựng thực đơn lành mạnh
                      </h5>
                      <p className="card-text">
                        Hướng dẫn xây dựng thực đơn dinh dưỡng cân bằng cho học
                        sinh...
                      </p>
                      <Link
                        to="/parent/blog/2"
                        className="btn btn-link text-primary p-0"
                      >
                        Đọc thêm →
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Kết thúc Blog Post 2 */}

                {/* Mở đầu Blog Post 3 */}
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      className="card-img-top"
                      alt="Rửa tay đúng cách"
                      style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        borderTopLeftRadius: "0.75rem",
                        borderTopRightRadius: "0.75rem",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/800x180?text=No+Image";
                      }}
                    />
                    <div className="card-body">
                      <small className="text-muted">05/03/2024</small>
                      <h5 className="card-title mt-2">
                        Tầm quan trọng của việc rửa tay đúng cách
                      </h5>
                      <p className="card-text">
                        Hướng dẫn chi tiết về quy trình rửa tay đúng cách để phòng
                        tránh bệnh...
                      </p>
                      <Link
                        to="/parent/blog/3"
                        className="btn btn-link text-primary p-0"
                      >
                        Đọc thêm →
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Kết thúc Blog Post 3 */}
              </div>
            )}
          </div>
        </section>
        {/* Kết thúc Health Blog Section */}
      </div>
    </div>
  );
};

export default ParentDashboard;
