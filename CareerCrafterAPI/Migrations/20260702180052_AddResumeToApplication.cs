using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CareerCrafterAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddResumeToApplication : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ResumeId",
                table: "Applications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Applications_ResumeId",
                table: "Applications",
                column: "ResumeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Resumes_ResumeId",
                table: "Applications",
                column: "ResumeId",
                principalTable: "Resumes",
                principalColumn: "ResumeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Resumes_ResumeId",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_ResumeId",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "ResumeId",
                table: "Applications");
        }
    }
}
