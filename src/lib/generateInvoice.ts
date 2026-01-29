import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { devLog } from './logger';

export interface InvoiceData {
  // Invoice Details
  invoice_number: string;
  invoice_date: string;
  
  // Order & Payment Details
  order_id: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  payment_method?: string;
  payment_status: string;
  
  // Customer Details
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  
  // Event Details
  event_title: string;
  event_date: string;
  event_time: string;
  event_venue: string;
  
  // Ticket Details
  ticket_number: string;
  category_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  
  // Company Details (optional - can be customized)
  company_name?: string;
  company_address?: string;
  company_email?: string;
  company_phone?: string;
  company_gstin?: string;
}

// Default company details - customize these for your business
const DEFAULT_COMPANY = {
  name: 'Astra Productions',
  address: 'Mumbai, Maharashtra, India',
  email: 'info@astragroups.org',
  phone: '+91 1234567890',
  gstin: 'XXXXXXXXXXXX', // Add your GSTIN when available
};

/**
 * Generate and download invoice as PDF
 * Includes payment details, ticket info, and company information
 */
export async function generateInvoicePDF(invoice: InvoiceData): Promise<void> {
  try {
    const company = {
      name: invoice.company_name || DEFAULT_COMPANY.name,
      address: invoice.company_address || DEFAULT_COMPANY.address,
      email: invoice.company_email || DEFAULT_COMPANY.email,
      phone: invoice.company_phone || DEFAULT_COMPANY.phone,
      gstin: invoice.company_gstin || DEFAULT_COMPANY.gstin,
    };

    // Create a temporary container for rendering
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '800px';
    container.style.padding = '40px';
    container.style.backgroundColor = '#ffffff';
    container.style.color = '#333333';
    container.style.fontFamily = 'Arial, sans-serif';

    const invoiceDate = new Date(invoice.invoice_date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Calculate tax (if applicable - 18% GST example)
    const baseAmount = invoice.total_price / 1.18; // Assuming price includes GST
    const gstAmount = invoice.total_price - baseAmount;

    container.innerHTML = `
      <div style="border: 1px solid #e0e0e0; padding: 40px; background: #ffffff;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 3px solid #ff6b35; padding-bottom: 20px;">
          <div>
            <h1 style="margin: 0; font-size: 28px; color: #ff6b35; font-weight: bold;">${company.name}</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">${company.address}</p>
            <p style="margin: 2px 0 0 0; font-size: 12px; color: #666;">Email: ${company.email}</p>
            <p style="margin: 2px 0 0 0; font-size: 12px; color: #666;">Phone: ${company.phone}</p>
            ${company.gstin !== 'XXXXXXXXXXXX' ? `<p style="margin: 2px 0 0 0; font-size: 12px; color: #666;">GSTIN: ${company.gstin}</p>` : ''}
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; font-size: 32px; color: #333; font-weight: bold;">INVOICE</h2>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;">Invoice No: <strong style="color: #333;">${invoice.invoice_number}</strong></p>
            <p style="margin: 2px 0 0 0; font-size: 12px; color: #666;">Date: <strong style="color: #333;">${invoiceDate}</strong></p>
            <div style="margin-top: 10px; padding: 5px 15px; background: ${invoice.payment_status === 'captured' ? '#4caf50' : '#ff9800'}; color: white; border-radius: 4px; display: inline-block;">
              ${invoice.payment_status === 'captured' ? 'PAID' : invoice.payment_status.toUpperCase()}
            </div>
          </div>
        </div>

        <!-- Bill To -->
        <div style="margin-bottom: 30px; padding: 20px; background: #f9f9f9; border-radius: 8px;">
          <h3 style="margin: 0 0 15px 0; font-size: 14px; color: #ff6b35; text-transform: uppercase;">Bill To</h3>
          <p style="margin: 0; font-size: 16px; color: #333; font-weight: bold;">${invoice.customer_name}</p>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">${invoice.customer_email}</p>
          <p style="margin: 2px 0 0 0; font-size: 13px; color: #666;">${invoice.customer_phone}</p>
        </div>

        <!-- Order Details -->
        <div style="margin-bottom: 30px;">
          <h3 style="margin: 0 0 15px 0; font-size: 14px; color: #ff6b35; text-transform: uppercase;">Order Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr style="background: #f0f0f0;">
              <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Order ID</td>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">${invoice.order_id}</td>
              <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Ticket No.</td>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">${invoice.ticket_number}</td>
            </tr>
            ${invoice.razorpay_payment_id ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Payment ID</td>
              <td style="padding: 10px; border: 1px solid #e0e0e0;" colspan="3">${invoice.razorpay_payment_id}</td>
            </tr>
            ` : ''}
            <tr style="background: #f0f0f0;">
              <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Payment Method</td>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">${invoice.payment_method || 'Online'}</td>
              <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Status</td>
              <td style="padding: 10px; border: 1px solid #e0e0e0; color: ${invoice.payment_status === 'captured' ? '#4caf50' : '#ff9800'}; font-weight: bold;">
                ${invoice.payment_status === 'captured' ? 'Paid' : invoice.payment_status}
              </td>
            </tr>
          </table>
        </div>

        <!-- Event Information -->
        <div style="margin-bottom: 30px; padding: 20px; background: #fff8f5; border-left: 4px solid #ff6b35; border-radius: 0 8px 8px 0;">
          <h3 style="margin: 0 0 15px 0; font-size: 14px; color: #ff6b35; text-transform: uppercase;">Event Information</h3>
          <p style="margin: 0; font-size: 18px; color: #333; font-weight: bold;">${invoice.event_title}</p>
          <p style="margin: 8px 0 0 0; font-size: 13px; color: #666;">
            📅 ${invoice.event_date} at ${invoice.event_time}
          </p>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #666;">
            📍 ${invoice.event_venue}
          </p>
        </div>

        <!-- Items Table -->
        <div style="margin-bottom: 30px;">
          <h3 style="margin: 0 0 15px 0; font-size: 14px; color: #ff6b35; text-transform: uppercase;">Items</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <thead>
              <tr style="background: #ff6b35; color: white;">
                <th style="padding: 12px; text-align: left; border: 1px solid #ff6b35;">Description</th>
                <th style="padding: 12px; text-align: center; border: 1px solid #ff6b35;">Category</th>
                <th style="padding: 12px; text-align: center; border: 1px solid #ff6b35;">Qty</th>
                <th style="padding: 12px; text-align: right; border: 1px solid #ff6b35;">Unit Price</th>
                <th style="padding: 12px; text-align: right; border: 1px solid #ff6b35;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 12px; border: 1px solid #e0e0e0;">
                  <strong>${invoice.event_title}</strong><br>
                  <span style="font-size: 11px; color: #666;">Event Ticket</span>
                </td>
                <td style="padding: 12px; text-align: center; border: 1px solid #e0e0e0;">${invoice.category_name}</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #e0e0e0;">${invoice.quantity}</td>
                <td style="padding: 12px; text-align: right; border: 1px solid #e0e0e0;">₹${invoice.unit_price.toLocaleString('en-IN')}</td>
                <td style="padding: 12px; text-align: right; border: 1px solid #e0e0e0;">₹${invoice.total_price.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Totals -->
        <div style="display: flex; justify-content: flex-end; margin-bottom: 30px;">
          <table style="width: 300px; border-collapse: collapse; font-size: 13px;">
            <tr>
              <td style="padding: 8px; text-align: right; color: #666;">Subtotal:</td>
              <td style="padding: 8px; text-align: right; font-weight: bold;">₹${baseAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 8px; text-align: right; color: #666;">GST (18%):</td>
              <td style="padding: 8px; text-align: right;">₹${gstAmount.toFixed(2)}</td>
            </tr>
            <tr style="background: #ff6b35; color: white;">
              <td style="padding: 12px; text-align: right; font-weight: bold;">Total:</td>
              <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 18px;">₹${invoice.total_price.toLocaleString('en-IN')}</td>
            </tr>
          </table>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <h4 style="margin: 0 0 10px 0; font-size: 12px; color: #ff6b35;">Terms & Conditions</h4>
              <ul style="margin: 0; padding-left: 15px; font-size: 10px; color: #666; line-height: 1.6;">
                <li>This is a computer-generated invoice and does not require a signature.</li>
                <li>Tickets are non-refundable unless the event is cancelled.</li>
                <li>Please carry a valid ID proof along with this invoice.</li>
                <li>Entry is subject to event terms and conditions.</li>
              </ul>
            </div>
            <div style="text-align: right;">
              <p style="margin: 0; font-size: 10px; color: #666;">Thank you for your purchase!</p>
              <p style="margin: 5px 0 0 0; font-size: 10px; color: #666;">For support: ${company.email}</p>
            </div>
          </div>
          <div style="text-align: center; margin-top: 20px;">
            <p style="margin: 0; font-size: 9px; color: #999;">
              Generated on ${new Date().toLocaleString('en-IN')} • ${company.name}
            </p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    // Convert HTML to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
    });

    // Create PDF from canvas
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate dimensions to fit on page
    const ratio = canvas.width / canvas.height;
    let width = pdfWidth - 10;
    let height = width / ratio;

    if (height > pdfHeight - 10) {
      height = pdfHeight - 10;
      width = height * ratio;
    }

    const x = (pdfWidth - width) / 2;
    const y = 5; // Start from top

    pdf.addImage(imgData, 'PNG', x, y, width, height);

    // Download PDF
    const filename = `Invoice-${invoice.invoice_number}.pdf`;
    pdf.save(filename);

    // Cleanup
    document.body.removeChild(container);

    devLog.log('Invoice PDF generated:', invoice.invoice_number);
  } catch (error) {
    devLog.error('Error generating invoice PDF:', error);
    throw new Error('Failed to generate invoice PDF');
  }
}

/**
 * Generate invoice number from order/ticket data
 */
export function generateInvoiceNumber(ticketNumber: string): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `INV-${year}${month}-${ticketNumber}`;
}
