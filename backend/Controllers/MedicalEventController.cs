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
    public class MedicalEventController : ControllerBase
    {
        private readonly IMedicalEventService _medicalEventService;
        public MedicalEventController(IMedicalEventService medicalEventService)
        {
            _medicalEventService = medicalEventService;
        }
        [HttpPost]
        [Authorize(Policy = "NurseOnly")]
        public async Task<IActionResult> CreateMedicalEvent([FromBody] MedicalEventRequest request)
        {
            if (request == null)
            {
                return BadRequest(new BaseResponse<bool>(false, "Request body is null", false));
            }

            var createdMedicalEvent = await _medicalEventService.CreateMedicalEventAsync(request);
            if (!createdMedicalEvent)
            {
                return StatusCode(500, new BaseResponse<bool>(false, "An error occurred while creating the medical event", false));
            }

            return Ok(new BaseResponse<bool>(true, "Medical event created successfully", true));
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetMedicalEventById(int id)
        {
            var medicalEvent = await _medicalEventService.GetMedicalEventByIdAsync(id);
            if (medicalEvent == null)
            {
                return NotFound(new BaseResponse<string>(null, "Medical event not found", false));
            }
            return Ok(new BaseResponse<MedicalEventDetailDTO>(medicalEvent, "Medical event retrieved successfully", true));
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllMedicalEvents(int pageNumber, int pageSize, string? search)
        {
            try
            {
                var medicalEvents = await _medicalEventService.GetAllMedicalEventsAsync(pageNumber, pageSize, search);
                return Ok(new BaseResponse<PageResult<MedicalEventDTO>>(medicalEvents, "Medical events retrieved successfully", true));
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse<string>(null, $"Error: {ex.Message}", false));
            }
        }

        [HttpGet("medical-event-count")]
        [Authorize]
        public async Task<IActionResult> GetMedicalEventsCount()
        {
            try
            {
                var result = await _medicalEventService.GetEventCountsAsync();
                return Ok(new BaseResponse<MedicalEventCountDTO>(result, "Lấy số lượng sự kiện y tế thành công", true));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponse<MedicalEventCountDTO>(null, $"Có lỗi xảy ra: {ex.Message}", false));
            }
        }
        [HttpGet("parent/{parentId}")]
        [Authorize]
        public async Task<IActionResult> GetMedicalEventsByParentId(int parentId, int pageNumber, int pageSize, string? search)
        {
            try
            {
                var medicalEvents = await _medicalEventService.GetMedicalEventsByParentIdAsync(parentId, pageNumber, pageSize, search);
                return Ok(new BaseResponse<PageResult<MedicalEventDTO>>(medicalEvents, "Lấy danh sách sự kiện y tế theo phụ huynh thành công", true));
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse<string>(null, $"Có lỗi xảy ra: {ex.Message}", false));
            }
        }
    }
}