using backend.Interfaces;
using backend.Models;
using backend.Models.DTO;
using backend.Models.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicalSupplyController : ControllerBase
    {
        private readonly IMedicalSupplyService _medicalSupplyService;

        public MedicalSupplyController(IMedicalSupplyService medicalSupplyService)
        {
            _medicalSupplyService = medicalSupplyService;
        }

        [HttpGet]
        [Authorize]

        public async Task<IActionResult> GetAllMedicalSupplies(int pageNumber, int pageSize, string? search)
        {
            try
            {
                var supplies = await _medicalSupplyService.GetAllMedicalSuppliesAsync(pageNumber, pageSize, search);
                return Ok(new BaseResponse<PageResult<MedicalSupplyDTO>>(supplies, "Lấy danh sách vật tư y tế thành công", true));
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse<string>(null, $"Lỗi: {ex.Message}", false));
            }
        }

        [HttpPost]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<BaseResponse<object>>> CreateMedicalSupplies([FromBody] MedicalSupplyRequest supplyRequest)
        {
            try
            {
                if (supplyRequest == null)
                {
                    return BadRequest(new BaseResponse<bool>(false, "Tạo vật tư y tế thất bại", false));
                }

                var isSuccess = await _medicalSupplyService.CreateMedicalSuppliesAsync(supplyRequest);
                return Ok(new BaseResponse<bool>(isSuccess, "Tạo vật tư y tế thành công", true));
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse<bool>(false, $"Lỗi: {ex.Message}", false));
            }
        }

        [HttpPatch("{id}")]
        [Authorize (Policy = "AdminOnly")]
        public async Task<ActionResult<BaseResponse<object>>> UpdateMedicalSupplies([FromBody] MedicalSupplyRequest supplyRequest, int id)
        {
            try
            {
                if (supplyRequest == null)
                {
                    return BadRequest(new BaseResponse<bool>(false, "Cập nhật vật tư y tế thất bại", false));
                }

                var isSuccess = await _medicalSupplyService.UpdateMedicalSupplyAsync(supplyRequest, id);
                return Ok(new BaseResponse<bool>(isSuccess, "Cập nhật vật tư y tế thành công", true));
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse<bool>(false, $"Lỗi: {ex.Message}", false));
            }
        }

        [HttpDelete("{id}")]
        [Authorize (Policy = "AdminOnly")]
        public async Task<ActionResult<BaseResponse<bool>>> DeleteMedicalSupply(int id)
        {
            try
            {
                var isDeleted = await _medicalSupplyService.DeleteMeidcalSuppliesAsync(id);
                if (!isDeleted)
                {
                    return NotFound(new BaseResponse<bool>(false, "Không tìm thấy vật tư y tế cần xóa", false));
                }

                return Ok(new BaseResponse<bool>(true, "Xóa vật tư y tế thành công", true));
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse<bool>(false, $"Lỗi: {ex.Message}", false));
            }
        }

        [HttpGet("medical-supplies-count")]
        [Authorize]
        public async Task<IActionResult> GetMedicalSuppliesCounts()
        {
            try
            {
                var result = await _medicalSupplyService.GetInventoryCountsAsync();
                return Ok(new BaseResponse<MedicalSuppliesCountDTO>(result, "Lấy thống kê thuốc thành công", true));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponse<MedicalSuppliesCountDTO>(null, $"Có lỗi xảy ra: {ex.Message}", false));
            }
        }
    }
}